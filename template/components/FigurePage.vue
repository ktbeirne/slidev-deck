<!--
  図解ページの標準骨格（本文ページの最頻出型: リード文→視覚ブロック→下テキスト→注記）。
  縦リズム（ブロック間隔・下テキストの声量）を部品側で固定し、ページ毎の手書きmarginの揺れを防ぐ。
  視覚ブロックの中身は自由（SVG図・表・Compare・FlowSteps・グリッド等をそのまま入れる）。
  Before/After ページもこの骨格＋視覚ブロックに Compare を入れる形で組む。
  props:
    compact: 高密度ページ用の詰めリズム（間隔を1段詰め、下テキストを text-s に。既定 false）
  slots:
    lead:    リード文（takeaway。1ページ1つ）
    default: 視覚ブロック
    after:   図の下の本文（任意）
    note:    減衰注記（任意。dim表示）
-->
<script setup>
defineProps({
  compact: { type: Boolean, default: false },
})
</script>

<template>
  <div class="sd-figpage" :class="{ compact }">
    <div class="takeaway"><slot name="lead" /></div>
    <div class="sd-figpage-visual"><slot /></div>
    <p v-if="$slots.after" class="sd-figpage-after"><slot name="after" /></p>
    <p v-if="$slots.note" class="sd-figpage-note dim"><slot name="note" /></p>
  </div>
</template>

<style scoped>
.sd-figpage-visual { margin-top: var(--space-6); }
.sd-figpage-after { font-size: var(--text-m); margin: var(--space-6) 0 0 0; }
.sd-figpage-note { font-size: var(--text-s); margin: var(--space-4) 0 0 0; }
/* compact: 要素の多いページ（補足ページ等）向けに1段詰める */
.compact .sd-figpage-visual { margin-top: var(--space-5); }
.compact .sd-figpage-after { font-size: var(--text-s); margin-top: var(--space-3); }
.compact .sd-figpage-note { margin-top: var(--space-2); }
</style>
