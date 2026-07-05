<!--
  定義・大メッセージ型（1枚に主文1つを最大声量で据えるページ。定義・宣言・キーメッセージ用）。
  ページ側は layout: base / align: center とし、takeaway は別途置かない（主文が takeaway 本体）。
  slots:
    default: 主文（改行は <br> で明示。強調は <span class="accent"> を1〜2語まで）
    sub:     補足段落（たとえ話など。任意）
    note:    減衰注記（任意。dim表示）
-->
<template>
  <div class="sd-big-statement">
    <div class="sd-big-main"><slot /></div>
    <p v-if="$slots.sub" class="sd-big-sub"><slot name="sub" /></p>
    <p v-if="$slots.note" class="sd-big-note dim"><slot name="note" /></p>
  </div>
</template>

<style scoped>
.sd-big-statement { text-align: center; }
.sd-big-main { font-size: var(--text-display); font-weight: 700; line-height: 1.6; }
.sd-big-sub { font-size: var(--text-m); margin: var(--space-6) 0 0 0; }
.sd-big-note { font-size: var(--text-s); margin: var(--space-6) 0 0 0; }
</style>
