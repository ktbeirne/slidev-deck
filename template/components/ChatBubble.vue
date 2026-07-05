<!--
  会話例の吹き出し1つ。ChatExample の default スロット内で使う。
  発話文の外側「」は付けない（吹き出し自体が引用装置）。
  props:
    role: 'user'（右寄せ・brand-primary塗り＋白抜き）| 'ai'（左寄せ・surface-alt）
-->
<script setup>
defineProps({
  role: { type: String, required: true, validator: (v) => ['user', 'ai'].includes(v) },
})
</script>

<template>
  <div class="sd-bubble" :class="role"><slot /></div>
</template>

<style scoped>
.sd-bubble {
  font-size: var(--text-l);
  line-height: 1.6;
  padding: var(--space-4) var(--space-5);
  max-width: 90%;
}
.sd-bubble + .sd-bubble { margin-top: var(--space-5); }
/* 角丸: 話者側の上角のみ小さく（吹き出しの尻尾の代替） */
.sd-bubble.user {
  align-self: flex-end;
  background: var(--brand-primary);
  color: var(--text-inverse);
  border-radius: var(--radius-l) var(--radius-s) var(--radius-l) var(--radius-l);
}
.sd-bubble.ai {
  align-self: flex-start;
  background: var(--surface-alt);
  color: var(--text-color);
  border-radius: var(--radius-s) var(--radius-l) var(--radius-l) var(--radius-l);
}
</style>
