<!--
  表紙レイアウト
  frontmatter:
    kicker: 小見出し（タイトル上の控えめな一行）
    author: 発表者名（下部・控えめ）
    date:   発表日（下部・控えめ）
  本文（slot）はタイトルとしてそのまま中央に大きく表示する。
-->
<script setup>
defineProps({
  kicker: { type: String, default: '' },
  author: { type: String, default: '' },
  date: { type: String, default: '' },
})
</script>

<template>
  <div class="sd-cover">
    <div class="sd-cover-body">
      <p class="sd-cover-kicker" v-if="kicker">{{ kicker }}</p>
      <div class="sd-cover-title">
        <slot />
      </div>
    </div>

    <footer class="sd-cover-footer" v-if="author || date">
      <span v-if="author">{{ author }}</span>
      <span v-if="date">{{ date }}</span>
    </footer>
  </div>
</template>

<style scoped>
.sd-cover {
  position: absolute;
  inset: 0;
  background: var(--surface);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
}
.sd-cover-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-6);
}
.sd-cover-kicker {
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: var(--brand-primary);
  margin: 0 0 var(--space-3) 0;
  font-weight: 700;
}
.sd-cover-title {
  font-family: var(--font-title);
  font-size: var(--text-display);
  font-weight: 700;
  color: var(--heading-color);
  line-height: 1.4;
}
.sd-cover-footer {
  display: flex;
  justify-content: center;
  gap: var(--space-5);
  padding: var(--space-4) var(--space-6);
  padding-bottom: var(--space-6);
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.6;
}
</style>
