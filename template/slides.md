---
theme: default
title: デッキタイトルをここに
mdc: true
aspectRatio: '16/9'
canvasWidth: 1280
fonts:
  # --font-title(BIZ UDPGothic) もGoogle Fontsから読み込ませるため sans に併記する
  sans: 'Noto Sans JP,BIZ UDPGothic'
  serif: 'Noto Sans JP'
  mono: 'JetBrains Mono'
  provider: google
  weights: '400,700'
frame: topline
# 用途モード: presentation=登壇（既定） / reading=報告・回覧用（ページ参照許容、lintも連動）
deckMode: presentation
layout: cover
kicker: サブタイトルをここに
author: 発表者名
date: 2026-07-03
---

<!-- ここを差し替える: デッキの主張タイトルを1〜2行で書く -->
デッキタイトル

---
layout: base
heading: 結論を1つに絞り、根拠は図と数字で支える
align: top
---

<div class="takeaway">1枚のスライドは結論を1つだけ持つ</div>

<div style="display: flex; align-items: center; gap: var(--space-5); margin-top: var(--space-6);">
  <Badge color="primary" variant="solid">結論</Badge>
  <KeyNumber value="1" label="スライドあたりの主張数" color="primary" />
</div>
