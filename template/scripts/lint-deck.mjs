#!/usr/bin/env node
// slidev-deck 規約の機械チェック。依存なし・ESM・fs/pathのみ使用。
//
// 使い方: node scripts/lint-deck.mjs [対象ファイル(既定: slides.md)]
// components/*.vue と layouts/*.vue が存在すれば自動でスキャン対象に加える。
// theme*.css と style.css は色・構造トークンの定義箇所なので対象外。
//
// チェック項目:
//   [ERROR] hex色直書き（#3桁/6桁）。ただし `--` で始まるCSS変数定義行は許可
//   [ERROR] ページ番号参照 / 次ページ誘導（headmatter `deckMode: reading` のデッキでは適用しない）
//   [ERROR] ダッシュ（—/―/–）。見出し・本文とも禁止（slides.md のみ。コードフェンスと引用行 `>` は除外）
//           日本語の通常話法にダッシュは現れない。メッセージが1文にまとまっていない痕跡
//   [WARN]  生の border-radius / box-shadow（var(--...) 非経由）
//   [WARN]  1スライド60行超（slides.md のみ。--- 区切りで分割、frontmatterは除外）
//   [WARN]  箇条書き偏重（非空行の過半かつ6行以上が `- `/`* ` 始まり）。2スライド連続でさらにWARN
//   [WARN]  視覚要素ゼロ（非空10行超なのにVueコンポーネント/img/svg/table/markdown表/mermaid/grid・flexが皆無）
//   ※ .vue ファイルはコードコメントとの誤検知を避けるためダッシュ検査の対象外
//
// 出力: file:line [ERROR|WARN] メッセージ
// slides.md はスライド番号も表示する。最後にサマリを出し、errorが1件以上あれば exit 1。

import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, basename } from 'node:path'

const targetArg = process.argv[2] || 'slides.md'
const targetPath = join(process.cwd(), targetArg)

const HEX_COLOR_RE = /#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\b/g
const CSS_VAR_DEF_RE = /^\s*--[\w-]+\s*:/
// (?![0-9A-Za-z]) で「P2P」「P3ラベル付き英字」等の複合語を誤検知しない
const PAGE_REF_RE = /(^|[^A-Za-z0-9_])P\d+(?![0-9A-Za-z])/
const NEXT_PAGE_RE = /(→\s*次|次ページへ|次のスライド)/
const RAW_RADIUS_RE = /border-radius\s*:\s*\d/
const VAR_RADIUS_OK_RE = /border-radius\s*:\s*var\(--radius/
const MAX_SLIDE_LINES = 60

// ダッシュ3種（em dash / horizontal bar / en dash）。日本語の通常話法に現れない記号で、
// 使用はメッセージが1文にまとまっていない痕跡。引用の再現（> 行）のみ許容
const DASH_RE = /[—―–]/
const QUOTE_LINE_RE = /^\s*>/
const HEADING_LINE_RE = /^\s*heading\s*:/
const BULLET_LINE_RE = /^\s*[-*]\s/
const MIN_BULLET_LINES = 6
// カスタム要素（<mdi-xxx /> 等の iconify コンポーネント）と CSS クラス定義内の display:grid/flex も
// 視覚マーカーとして検知する（HTML+iconify で組む図が「視覚要素なし」に誤判定されるのを防ぐ。2026-07-04）
const VISUAL_MARKER_RE = /<[A-Z][A-Za-z]|<[a-z][a-z0-9]*(?:-[a-z0-9]+)+[\s/>]|<img\b|<svg\b|<table\b|\|.+\|| style\s*=\s*["'][^"']*(grid|flex)|display\s*:\s*(grid|flex)|```mermaid/
const MIN_LINES_FOR_VISUAL_CHECK = 10

/** @type {{errors: number, warns: number}} */
const summary = { errors: 0, warns: 0 }

function report(file, line, level, message) {
  const label = level === 'ERROR' ? '[ERROR]' : '[WARN]'
  console.log(`${file}:${line} ${label} ${message}`)
  if (level === 'ERROR') summary.errors++
  else summary.warns++
}

/** headmatter から deckMode を読む（既定 presentation）。reading = 単体で読む報告・回覧資料 */
function detectDeckMode(content) {
  const head = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (head) {
    const m = head[1].match(/^deckMode\s*:\s*['"]?(\w+)/m)
    if (m) return m[1]
  }
  return 'presentation'
}

/** コードフェンス（```）内の行番号集合を返す */
function collectFencedLineNumbers(lines) {
  const fenced = new Set()
  let inFence = false
  lines.forEach((line, idx) => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      fenced.add(idx + 1) // フェンス行自体も除外
      return
    }
    if (inFence) fenced.add(idx + 1)
  })
  return fenced
}

/** hex色・radius・shadow の共通チェック（CSS/Vue/Markdown 共通ロジック） */
function checkTokenViolations(displayName, lines, fencedLines, isMarkdown, deckMode) {
  lines.forEach((line, idx) => {
    const lineNo = idx + 1
    const inFence = fencedLines.has(lineNo)

    // hex直書き: CSS変数定義行は許可。Markdownの場合コードフェンス内は除外。
    if (!CSS_VAR_DEF_RE.test(line)) {
      if (!(isMarkdown && inFence)) {
        const matches = line.match(HEX_COLOR_RE)
        if (matches) {
          report(displayName, lineNo, 'ERROR', `hex色直書き検出: ${matches.join(', ')} — var(--...) トークンを使う`)
        }
      }
    }

    // ページ番号参照・次ページ誘導: 登壇前提の規則なので reading モードでは適用しない
    if (deckMode !== 'reading' && !(isMarkdown && inFence)) {
      if (PAGE_REF_RE.test(line)) {
        report(displayName, lineNo, 'ERROR', 'ページ番号参照を検出（例: P3） — プレゼン前提のため具体名で書く')
      }
      if (NEXT_PAGE_RE.test(line)) {
        report(displayName, lineNo, 'ERROR', '次ページ誘導を検出（例: → 次へ） — 発表者が口頭で行うため不要')
      }
    }

    // 生radius/shadow（WARN）
    if (RAW_RADIUS_RE.test(line) && !VAR_RADIUS_OK_RE.test(line)) {
      report(displayName, lineNo, 'WARN', '生の border-radius 値を検出 — var(--radius-*) を使う')
    }
    if (/box-shadow\s*:/.test(line) && !/var\(--shadow/.test(line) && !/box-shadow\s*:\s*none/.test(line)) {
      report(displayName, lineNo, 'WARN', '生の box-shadow 値を検出 — var(--shadow-*) を使う')
    }
  })
}

/** slides.md をスライド単位（--- 区切り）に分割し、行数超過をチェック */
function checkSlideDensity(displayName, content) {
  const lines = content.split(/\r?\n/)

  // frontmatter（先頭の --- ... --- ブロック）を検出して除外
  let bodyStart = 0
  if (lines[0] === '---') {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i] === '---') {
        bodyStart = i + 1
        break
      }
    }
  }

  // 本文を --- 区切りでスライドに分割（frontmatter以降の `---` 単独行が区切り）
  let slideNo = 1
  let slideStartLine = bodyStart + 1
  let slideLineCount = 0

  const flushSlide = () => {
    if (slideLineCount > MAX_SLIDE_LINES) {
      report(displayName, slideStartLine, 'WARN', `スライド${slideNo}が${slideLineCount}行（60行超）— 過密の可能性。分割を検討`)
    }
    slideNo++
  }

  for (let i = bodyStart; i < lines.length; i++) {
    const line = lines[i]
    const lineNo = i + 1
    if (line.trim() === '---') {
      flushSlide()
      slideLineCount = 0
      // 区切り直後が `key: value` 行ならスライド個別 frontmatter。
      // 閉じ `---` を新スライドの区切りと誤認しないよう、ブロックごと読み飛ばす（行数にも含めない）
      if (i + 1 < lines.length && /^[\w-]+\s*:/.test(lines[i + 1])) {
        let j = i + 1
        while (j < lines.length && lines[j].trim() !== '---') j++
        i = j // j は閉じ ---。for の i++ で本文先頭へ進む
        slideStartLine = j + 2
      } else {
        slideStartLine = lineNo + 1
      }
      continue
    }
    slideLineCount++
  }
  // 最後のスライド
  flushSlide()
}

/**
 * slides.md を --- 区切りでスライドに分割し、各スライドの本文行（行番号付き）を返す。
 * checkSlideDensity と同じ分割規則（frontmatter除外・スライド個別frontmatter読み飛ばし）を共有する。
 * スライド個別frontmatter（heading: 等）の行は isFrontmatter: true で区別する。
 * 本文行数系のチェック（箇条書き偏重・視覚要素ゼロ）は isFrontmatter な行を数えないこと。
 * @returns {{startLine: number, rows: {lineNo: number, text: string, isFrontmatter: boolean}[]}[]}
 */
function splitSlides(content) {
  const lines = content.split(/\r?\n/)

  let bodyStart = 0
  if (lines[0] === '---') {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i] === '---') {
        bodyStart = i + 1
        break
      }
    }
  }

  const slides = []
  let slideStartLine = bodyStart + 1
  let rows = []

  const flush = () => {
    slides.push({ startLine: slideStartLine, rows })
  }

  for (let i = bodyStart; i < lines.length; i++) {
    const line = lines[i]
    const lineNo = i + 1
    if (line.trim() === '---') {
      flush()
      rows = []
      if (i + 1 < lines.length && /^[\w-]+\s*:/.test(lines[i + 1])) {
        let j = i + 1
        // スライド個別frontmatterの行（heading: 等）はダッシュチェック対象として rows に残す。
        // isFrontmatter: true でマークし、箇条書き判定・視覚要素判定の行数集計からは除外する。
        while (j < lines.length && lines[j].trim() !== '---') {
          rows.push({ lineNo: j + 1, text: lines[j], isFrontmatter: true })
          j++
        }
        i = j
        slideStartLine = j + 2
      } else {
        slideStartLine = lineNo + 1
      }
      continue
    }
    rows.push({ lineNo, text: line, isFrontmatter: false })
  }
  flush()

  return slides
}

/** スライド本文からコードフェンス内の行番号集合を返す（rows は該当スライド内の行のみ） */
function collectFencedLineNumbersInRows(rows) {
  const fenced = new Set()
  let inFence = false
  for (const { lineNo, text } of rows) {
    if (/^\s*```/.test(text)) {
      inFence = !inFence
      fenced.add(lineNo)
      continue
    }
    if (inFence) fenced.add(lineNo)
  }
  return fenced
}

/** ダッシュ禁止チェック: 見出し・本文とも ERROR。引用行（>）とコードフェンスのみ許容 */
function checkDashProhibition(displayName, slides) {
  for (const { rows } of slides) {
    const fenced = collectFencedLineNumbersInRows(rows)

    for (const { lineNo, text, isFrontmatter } of rows) {
      if (isFrontmatter) {
        if (HEADING_LINE_RE.test(text) && DASH_RE.test(text)) {
          report(displayName, lineNo, 'ERROR', '見出しにダッシュ（—/―/–）。メッセージが1文にまとまっていない痕跡。「：」で繋ぐか句点で分ける')
        }
        continue
      }
      if (fenced.has(lineNo)) continue
      if (QUOTE_LINE_RE.test(text)) continue // 引用の再現のみ許容
      if (DASH_RE.test(text)) {
        report(displayName, lineNo, 'ERROR', 'ダッシュ（—/―/–）を検出。日本語の通常話法には現れない。文を分けるか「：」に置き換える（引用行 > のみ許容）')
      }
    }
  }
}

/** 箇条書き偏重チェック: 非空行の過半かつ6行以上が `- `/`* ` 始まり。2スライド連続でさらにWARN */
function checkBulletHeavy(displayName, slides) {
  let prevWasBulletHeavy = false

  for (const { rows } of slides) {
    const nonEmpty = rows.filter((r) => !r.isFrontmatter && r.text.trim() !== '')
    const bulletRows = nonEmpty.filter((r) => BULLET_LINE_RE.test(r.text))
    const isBulletHeavy = bulletRows.length >= MIN_BULLET_LINES && bulletRows.length > nonEmpty.length / 2

    if (isBulletHeavy) {
      report(displayName, bulletRows[0].lineNo, 'WARN', '箇条書き偏重。図・表への変換を検討（layout-patterns.md）')
      if (prevWasBulletHeavy) {
        report(displayName, bulletRows[0].lineNo, 'WARN', '箇条書きスライドの連続。単調')
      }
    }
    prevWasBulletHeavy = isBulletHeavy
  }
}

/** 視覚要素ゼロチェック: 非空10行超なのに視覚マーカーが皆無 */
function checkNoVisualElements(displayName, slides) {
  for (const { rows } of slides) {
    const nonEmpty = rows.filter((r) => !r.isFrontmatter && r.text.trim() !== '')
    if (nonEmpty.length <= MIN_LINES_FOR_VISUAL_CHECK) continue

    const hasVisual = rows.some((r) => !r.isFrontmatter && VISUAL_MARKER_RE.test(r.text))
    if (!hasVisual) {
      report(displayName, nonEmpty[0].lineNo, 'WARN', '視覚要素なし。純テキストスライドは禁止（大メッセージ1-2行スライドは対象外）')
    }
  }
}

function lintFile(filePath, displayName, { isSlidesMd, deckMode }) {
  if (!existsSync(filePath)) return
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split(/\r?\n/)
  const fencedLines = isSlidesMd ? collectFencedLineNumbers(lines) : new Set()

  checkTokenViolations(displayName, lines, fencedLines, isSlidesMd, deckMode)

  if (isSlidesMd) {
    checkSlideDensity(displayName, content)

    const slides = splitSlides(content)
    checkDashProhibition(displayName, slides)
    checkBulletHeavy(displayName, slides)
    checkNoVisualElements(displayName, slides)
  }
}

function findVueFiles(dirName) {
  const dirPath = join(process.cwd(), dirName)
  if (!existsSync(dirPath)) return []
  return readdirSync(dirPath)
    .filter((f) => f.endsWith('.vue'))
    .map((f) => join(dirPath, f))
}

// --- 実行 ---
const deckMode = existsSync(targetPath) ? detectDeckMode(readFileSync(targetPath, 'utf-8')) : 'presentation'
if (deckMode === 'reading') {
  console.log('deckMode: reading — ページ番号参照・次ページ誘導のチェックを適用しません')
}

lintFile(targetPath, targetArg, { isSlidesMd: true, deckMode })

for (const dir of ['components', 'layouts']) {
  for (const filePath of findVueFiles(dir)) {
    const rel = join(dir, basename(filePath))
    lintFile(filePath, rel, { isSlidesMd: false, deckMode })
  }
}

console.log('')
console.log(`summary: error ${summary.errors} / warn ${summary.warns}`)

if (summary.errors > 0) {
  process.exit(1)
}
