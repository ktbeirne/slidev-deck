<!--
  色付きラベルの基礎プリミティブ。タグ・バッジ・ピル状のラベルは
  新しいCSSクラスを作らず、まずこの props で表現できないか検討する。
  props:
    color:   'primary' | 'info' | 'warn' | 'success' | 'neutral' はセマンティック変数にマップ。
             それ以外の文字列はCSS色としてそのまま使用する（エスケープハッチ）。
    variant: 'solid'（塗り+text-inverse文字） | 'soft'（色の12%透過背景+色文字） | 'outline'（枠線+色文字）
    size:    's' | 'm'（既定）
-->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: { type: String, default: 'primary' },
  variant: { type: String, default: 'solid' },
  size: { type: String, default: 'm' },
})

const colorMap = {
  primary: 'var(--brand-primary)',
  info: 'var(--accent-info)',
  warn: 'var(--accent-warn)',
  success: 'var(--accent-success)',
  neutral: 'var(--accent-neutral)',
}

const resolvedColor = computed(() => colorMap[props.color] || props.color)
</script>

<template>
  <span
    class="sd-badge"
    :class="[`sd-badge--${variant}`, `sd-badge--${size}`]"
    :style="{
      '--sd-badge-color': resolvedColor,
    }"
  >
    <slot />
  </span>
</template>

<style scoped>
.sd-badge {
  display: inline-flex;
  align-items: center;
  border-radius: var(--radius-pill);
  font-weight: 700;
  line-height: 1.4;
  white-space: nowrap;
}

/* variant: solid = 塗り + text-inverse文字 */
.sd-badge--solid {
  background: var(--sd-badge-color);
  color: var(--text-inverse);
}

/* variant: soft = 色の12%透過背景 + 色文字 */
.sd-badge--soft {
  background: color-mix(in srgb, var(--sd-badge-color) 12%, transparent);
  color: var(--sd-badge-color);
}

/* variant: outline = 枠線 + 色文字 */
.sd-badge--outline {
  background: transparent;
  color: var(--sd-badge-color);
  border: 1px solid var(--sd-badge-color);
}

/* size: s */
.sd-badge--s {
  font-size: 0.75rem;
  padding: var(--space-1) var(--space-2);
}

/* size: m */
.sd-badge--m {
  font-size: 0.9rem;
  padding: var(--space-1) var(--space-3);
}
</style>
