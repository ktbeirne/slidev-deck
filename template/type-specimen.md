---
theme: default
title: ページ型プレビュー
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
deckMode: reading
layout: cover
kicker: IntroToc / BigStatement / ChatExample / RecapList の見本（架空題材「バージョン管理入門」）
---

ページ型プレビュー

---
layout: base
heading: なぜバージョン管理を学ぶのか
align: top
---

<!-- 導入目次型: takeaway（モチベーション）＋ IntroToc（分かること＋ゴール） -->

<div class="takeaway">「ファイル名_最終版2」で履歴を管理する運用は、人数が増えると必ず破綻します。</div>

<IntroToc
  :items="[
    'バージョン管理とは何か（一文で）',
    'なぜ手作業のコピー管理では破綻するのか',
    '導入すると日常の作業がどう変わるのか',
  ]"
  goal="読み終えたとき、この3つを自分の言葉で説明できる状態がゴールです。"
/>

---
layout: base
heading: バージョン管理とは何か：一文で言うと
align: center
---

<!-- 定義・大メッセージ型: BigStatement（主文＋補足＋注記）。takeawayは置かない（主文が本体） -->

<BigStatement>
バージョン管理とは、ファイルの変更履歴を<br><span class="accent">「いつでも戻れる」</span>形で記録する仕組みのこと。
<template #sub>
たとえるなら、文書の「セーブポイント」。<br>過去の好きな時点に巻き戻せる記録装置です。
</template>
<template #note>
代表的なツールにGitがあります（仕組みの呼び名であって、特定製品の機能ではありません）。
</template>
</BigStatement>

---
layout: base
heading: 日常の操作はどう変わるのか
align: top
---

<!-- 図解ページ骨格（FigurePage）: リード→視覚ブロック（ここでは FlowSteps）→下テキスト→注記 -->

<FigurePage>
<template #lead>
日常の操作は「編集して、保存点を作る」の繰り返しだけ。
</template>

<FlowSteps :steps="[
  { label: '編集する', sub: 'ふだん通りの作業' },
  { label: '保存点を作る', sub: '区切りごとに記録' },
  { label: '履歴に積まれる', sub: '自動で時系列に整理' },
]" />

<template #after>
操作はこの3つの繰り返しです。保存点を作った時点には、いつでも戻れます。
</template>
<template #note>
保存点は「コミット」と呼ばれます（ツールによって呼び名が変わります）。
</template>
</FigurePage>

---
layout: base
heading: コピー管理と履歴管理は何が違うのか
align: top
---

<!-- 図解ページ骨格のBefore/After態: 視覚ブロックに Compare、リードは LeadBox（囲みリード変種） -->

<FigurePage>
<template #lead>
<LeadBox title="「最新の保証」を、人から仕組みへ">
コピー管理は「どれが最新か」を人の注意力に頼る。履歴管理はそれを仕組みに任せる。
</LeadBox>
</template>

<Compare leftTitle="コピーで管理" rightTitle="履歴で管理">
<template #left>
<p>「報告書_v2_final_直し.docx」のようなファイルが並ぶ。</p>
<p class="dim">どれが最新かは、覚えている人だけが知っている。</p>
</template>
<template #right>
<p>ファイルは1つ。変更の記録が時系列に並ぶ。</p>
<p class="dim">最新は常に先頭。過去の時点にも戻れる。</p>
</template>
</Compare>

<template #after>
違いはファイルの数ではなく、「最新はどれか」を誰が保証するかにあります。
</template>
</FigurePage>

---
layout: base
heading: すべての変更は、リポジトリを一度通ってから本番に届く
align: top
---

<!-- 図のみ型（FullVisual）: リード・下文なし、主張はタイトルが担う（主張型タイトル） -->

<FullVisual>
<svg class="fv-arch" viewBox="0 0 960 400" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="fvarr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path class="ahead" d="M0,0 L10,5 L0,10 Z"/></marker></defs>
<line class="wire" x1="150" y1="140" x2="292" y2="140" marker-end="url(#fvarr)"/>
<line class="wire" x1="490" y1="140" x2="582" y2="140" marker-end="url(#fvarr)"/>
<line class="wire" x1="750" y1="140" x2="822" y2="140" marker-end="url(#fvarr)"/>
<line class="wire" x1="410" y1="263" x2="410" y2="193" marker-end="url(#fvarr)"/>
<text class="alabel" x="221" y="120">変更を送る</text>
<text class="alabel" x="536" y="120">自動で検査</text>
<text class="alabel" x="786" y="120">合格のみ</text>
<text class="alabel" x="480" y="235">確認・承認</text>
<circle class="node" cx="90" cy="140" r="58"/><text class="nlabel" x="90" y="136">開発者</text><text class="nsub" x="90" y="158">（変更を作る）</text>
<rect class="hub" x="300" y="95" width="190" height="90" rx="10"/><text class="hlabel" x="395" y="132">リポジトリ</text><text class="hsub" x="395" y="158">（変更の関所）</text>
<rect class="box" x="590" y="95" width="160" height="90" rx="10"/><text class="blabel" x="670" y="132">自動チェック</text><text class="bsub" x="670" y="158">（決まりを検査）</text>
<rect class="box" x="830" y="95" width="120" height="90" rx="10"/><text class="blabel" x="890" y="132">本番環境</text><text class="bsub" x="890" y="158">（利用者が使う）</text>
<circle class="node" cx="410" cy="320" r="55"/><text class="nlabel" x="410" y="316">レビュー担当</text><text class="nsub" x="410" y="338">（内容を承認）</text>
</svg>
</FullVisual>

<style>
.fv-arch .node { fill: var(--surface); stroke: var(--border-color); stroke-width: 1.5; }
.fv-arch .nlabel { fill: var(--text-color); font-family: var(--font-body); font-size: 14px; text-anchor: middle; }
.fv-arch .nsub { fill: var(--text-color); font-family: var(--font-body); font-size: 11px; text-anchor: middle; }
.fv-arch .hub { fill: var(--brand-primary); }
.fv-arch .hlabel { fill: var(--text-inverse); font-family: var(--font-body); font-weight: 700; font-size: 16px; text-anchor: middle; }
.fv-arch .hsub { fill: var(--text-inverse); font-family: var(--font-body); font-size: 11px; text-anchor: middle; }
.fv-arch .box { fill: var(--surface); stroke: var(--brand-primary); stroke-width: 1.5; }
.fv-arch .blabel { fill: var(--brand-primary); font-family: var(--font-body); font-weight: 700; font-size: 14px; text-anchor: middle; }
.fv-arch .bsub { fill: var(--brand-primary); font-family: var(--font-body); font-size: 11px; text-anchor: middle; }
.fv-arch .wire { stroke: var(--accent-neutral); stroke-width: 1.6; }
.fv-arch .ahead { fill: var(--accent-neutral); }
.fv-arch .alabel { fill: var(--text-color); font-family: var(--font-body); font-weight: 700; font-size: 13px; text-anchor: middle; }
</style>

---
layout: base
heading: 5つの要件を全て満たすのは候補Aのみ
align: top
---

<!-- 図のみ型の全面表態: FullVisual に表を入れる（報告デッキの比較表想定） -->

<FullVisual>
<table class="sd-table fv-table">
<thead>
<tr><th>観点</th><th>候補A</th><th>候補B</th><th>候補C</th></tr>
</thead>
<tbody>
<tr><td>導入費用</td><td>○</td><td>○</td><td>△</td></tr>
<tr><td>既存システムとの連携</td><td>○</td><td>×</td><td>○</td></tr>
<tr><td>権限管理</td><td>○</td><td>○</td><td>×</td></tr>
<tr><td>日本語サポート</td><td>○</td><td>○</td><td>○</td></tr>
<tr><td>運用負荷</td><td>○</td><td>△</td><td>○</td></tr>
</tbody>
</table>
<template #note>
評価の根拠は付録の検証記録を参照（数値・条件つきで記載）。
</template>
</FullVisual>

<style>
.fv-table th, .fv-table td { font-size: var(--text-m); padding: var(--space-4) var(--space-5); }
.fv-table td + td, .fv-table th + th { text-align: center; }
/* 主役列（候補A）の強調: 位置・太字でなく色面で（強調チャネルは実装頑健性で選ぶ） */
.fv-table th:nth-child(2), .fv-table td:nth-child(2) { background: var(--surface-alt); font-weight: 700; }
</style>

---
layout: base
heading: 導入すると何が変わるのか
align: center
---

<!-- 会話例: takeaway ＋ ChatExample / ChatBubble -->

<div class="takeaway">変更の記録が自動で残るため、「戻したい」に口頭確認や探し物なしで応えられる。</div>

<ChatExample>
<ChatBubble role="user">昨日入れた変更、元に戻せる？</ChatBubble>
<ChatBubble role="ai">はい。昨日17時の保存時点に戻せます。<br>今の作業内容も、消さずに別へ残せます。</ChatBubble>
<template #note>
記録が時点ごとに残っているため、どこまで戻すかを選ぶだけで済みます。
</template>
</ChatExample>

---
layout: base
heading: まとめ
align: center
---

<!-- まとめ要点再掲型: takeaway（自己チェックの促し）＋ RecapList -->

<div class="takeaway">この3点が自分の言葉で言えれば、概要は理解できています。</div>

<RecapList
  :items="[
    '「バージョン管理とは、変更履歴をいつでも戻れる形で記録する仕組みである」',
    '「コピー運用は、どれが最新かの管理を人の注意力に頼るから破綻する」',
    '「導入すると、戻す・比べる・並行して直すが日常操作になる」',
  ]"
/>
