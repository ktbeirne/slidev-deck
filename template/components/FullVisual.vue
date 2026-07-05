<!--
  全面図・全面表ページ（図のみ型）。リード文・下テキストを置かず、本文領域の全体を
  視覚ブロック1つに使う。大きなアーキテクチャ構成図・全面比較表など、視覚物が主役で
  紙面を要するページ用。
  条件: ページの主張はタイトルが担う（主張型タイトル）。題目型デッキでは
  「山場1枚に限り主張型へ格上げ可」の規定（Phase S）を使う。
  これが「主張が紙面に明文化されないページを作らない」規則との両立条件。
  slots:
    default: 視覚ブロック（SVG図・表など1つ。SVGはviewBox指定で領域内に自動フィット）
    note:    減衰注記（任意。下端に dim 表示）
-->
<template>
  <div class="sd-fullvisual">
    <div class="sd-fullvisual-body"><slot /></div>
    <p v-if="$slots.note" class="sd-fullvisual-note dim"><slot name="note" /></p>
  </div>
</template>

<style scoped>
.sd-fullvisual { height: 100%; display: flex; flex-direction: column; min-height: 0; }
.sd-fullvisual-body { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; }
/* viewBox付きSVGを領域内に等比フィットさせる（preserveAspectRatio既定=meet） */
.sd-fullvisual-body :slotted(svg) { width: 100%; height: 100%; display: block; }
.sd-fullvisual-body :slotted(*) { max-width: 100%; }
.sd-fullvisual-note { font-size: var(--text-s); margin: var(--space-2) 0 0 0; flex: none; }
</style>
