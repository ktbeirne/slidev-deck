<!--
  リード囲みブロック（リード部の変種: 短いリードタイトル＋sub文を1ブロックで囲む）。
  素の takeaway 1行では足りず、リードに補足文を添えたいページで使う。
  FigurePage の #lead に入れても、ページ先頭に単独で置いてもよい。
  takeaway の代替であり「1ページ1つまで」の規則はそのまま適用される。
  props:
    title: リードタイトル（短い主張。太字・text-l）
  slots:
    default: sub文（補足説明。text-m・通常ウェイト。省略可）
-->
<script setup>
defineProps({
  title: { type: String, required: true },
})
</script>

<template>
  <div class="sd-leadbox">
    <p class="sd-leadbox-title">{{ title }}</p>
    <p v-if="$slots.default" class="sd-leadbox-sub"><slot /></p>
  </div>
</template>

<style scoped>
.sd-leadbox {
  background: var(--surface-alt);
  border-left: 4px solid var(--brand-primary);
  border-radius: var(--radius-m);
  padding: var(--space-4) var(--space-5);
}
.sd-leadbox-title { font-size: var(--text-l); font-weight: 700; line-height: 1.5; margin: 0; color: var(--text-color); }
.sd-leadbox-sub { font-size: var(--text-m); font-weight: 400; line-height: 1.7; margin: var(--space-2) 0 0 0; color: var(--text-color); }
</style>
