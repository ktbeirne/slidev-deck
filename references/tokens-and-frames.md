# セマンティック変数契約とフレームプリセット（Phase T / Phase I）

## セマンティック変数契約

デッキ側・specimen・frames.css はこの変数名だけに依存する。パレット候補はこの契約を満たす値の集合であり、**全変数を埋める**（欠けると specimen とデッキの両方に穴が出る）。

| 変数 | 役割 |
|---|---|
| --brand-primary / --brand-primary-dark | 主張色・強調 / その濃色（縁取り・強い強調） |
| --heading-color | 見出し文字色 |
| --text-color / --text-inverse | 本文基準色 / 濃色背景上の文字色（ダークでは暗色に反転） |
| --surface / --surface-alt | スライド背景 / カード・パネル背景 |
| --border-color | 罫線 |
| --accent-info / -warn / -success / -neutral | 図・バッジの系統色4種 |
| --font-body / --font-title / --font-mono | 本文 / 見出し / 等幅フォント |

- **hex を書いてよいのは themes/*.css と theme.css だけ**。他の全ファイルは var() 経由。
- 構造トークン（--space-1..6, --radius-s/m/l/pill, --shadow-1..3, --text-xs..display）は style.css で固定し、デッキごとに変えない。
- SVG図の内部単位（font-size px・stroke-width・rx）は viewBox 相対のため生値を許容する。CSSレイヤーの色・余白・角丸・影は全て var() 経由を維持する。

## フレームプリセット（frames.css）

| プリセット | 見た目 | 備考 |
|---|---|---|
| frame-none | 余白のみ | ミニマル |
| frame-topline | 上端4pxライン | |
| frame-band | 上20px帯＋下6px帯 | |
| frame-sideline | 左10px縦帯 | |
| frame-titlebar | ヘッダ帯に見出し（pptx型） | **唯一レイアウト連動**: 見出しスロットがフレーム側へ移り文字色は --text-inverse。本文の上余白はレイアウト側の責務 |

いずれも色はトークン消費のみ。パレットを差し替えるとフレームも追従する。
