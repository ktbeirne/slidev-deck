<!--
  導入目次型（解説・教育デッキの導入の型: モチベーション→分かること→ゴール）。
  ページ構成は「takeaway（モチベーション1文）→ 本部品」。takeaway はページ側に書く。
  型はブリーフのゴールの再言明であり、ここに新規の主張や共感演出を足さない。
  props:
    items:   「分かること」の項目（文字列配列。番号付きリストで表示）
    goal:    読後ゴール1行（「〜できる状態がゴールです」等。省略時は非表示）
    heading: リスト前の小見出し（既定「この資料で分かること」）
-->
<script setup>
defineProps({
  items: { type: Array, required: true },
  goal: { type: String, default: '' },
  heading: { type: String, default: 'この資料で分かること' },
})
</script>

<template>
  <div class="sd-intro-toc">
    <p class="sd-intro-heading">{{ heading }}</p>
    <ol>
      <li v-for="(item, i) in items" :key="i">{{ item }}</li>
    </ol>
    <p v-if="goal" class="dim sd-intro-goal">{{ goal }}</p>
  </div>
</template>

<style scoped>
/* この型はページ内の位置が固定（takeaway直後）なので上余白を部品側で持つ */
.sd-intro-toc { font-size: var(--text-m); line-height: 2; margin-top: var(--space-6); }
.sd-intro-heading { font-weight: 700; margin: 0; }
.sd-intro-toc ol { list-style: decimal; padding-left: var(--space-6); margin: 0; }
.sd-intro-toc li { margin-top: var(--space-2); }
.sd-intro-goal { margin: var(--space-5) 0 0 0; }
</style>
