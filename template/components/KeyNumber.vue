<!--
  大数字コールアウト。結論を支える1つの数字を大きく見せる。
  props:
    value: 表示する数字・数値文字列（必須）
    label: 数字の説明（必須）
    sub:   補足（既定 ''）
    color: 'primary'|'info'|'warn'|'success'|'neutral'（既定 'primary'）
  インライン要素として横に並べられるよう inline-flex。
-->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: String, required: true },
  label: { type: String, required: true },
  sub: { type: String, default: '' },
  color: { type: String, default: 'primary' },
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
  <div class="sd-keynumber" :style="{ '--sd-keynumber-color': resolvedColor }">
    <span class="sd-keynumber-value">{{ value }}</span>
    <span class="sd-keynumber-label">{{ label }}</span>
    <span class="sd-keynumber-sub" v-if="sub">{{ sub }}</span>
  </div>
</template>

<style scoped>
.sd-keynumber {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.sd-keynumber-value {
  font-size: var(--text-display);
  font-weight: 700;
  color: var(--sd-keynumber-color);
  line-height: 1.1;
}
.sd-keynumber-label {
  font-size: var(--text-s);
}
.sd-keynumber-sub {
  opacity: 0.65;
  font-size: var(--text-xs);
}
</style>
