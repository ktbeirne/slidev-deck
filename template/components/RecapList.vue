<!--
  まとめ要点再掲型（解説・教育デッキの締めの型: 要点再掲＋到達点の自己チェック）。
  ページ構成は「takeaway（自己チェックの促し1文）→ 本部品」。
  項目は本編の主張の再掲のみ（締めに新規の主張を足さない）。
  props:
    items: 再掲する要点（文字列配列。番号付きリストで表示）
-->
<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <ol class="sd-recap">
    <li v-for="(item, i) in items" :key="i">{{ item }}</li>
  </ol>
</template>

<style scoped>
.sd-recap { list-style: decimal; padding-left: var(--space-6); margin: var(--space-6) 0 0 0; }
.sd-recap li { font-size: var(--text-l); line-height: 1.8; }
.sd-recap li + li { margin-top: var(--space-5); }
</style>
