<!--
  対比パネル（現状vs改善、before/after）。
  props:
    leftTitle / rightTitle: 各パネルの見出し文字列
    leftTone / rightTone:   'primary'|'info'|'warn'|'success'|'neutral'（既定 leftTone='neutral', rightTone='success'）
  本文は slot #left / #right に渡す。
-->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  leftTitle: { type: String, default: '' },
  rightTitle: { type: String, default: '' },
  leftTone: { type: String, default: 'neutral' },
  rightTone: { type: String, default: 'success' },
})

const toneMap = {
  primary: 'var(--brand-primary)',
  info: 'var(--accent-info)',
  warn: 'var(--accent-warn)',
  success: 'var(--accent-success)',
  neutral: 'var(--accent-neutral)',
}

const leftColor = computed(() => toneMap[props.leftTone] || props.leftTone)
const rightColor = computed(() => toneMap[props.rightTone] || props.rightTone)
</script>

<template>
  <div class="sd-compare">
    <div class="sd-compare-panel">
      <div class="sd-compare-header" :style="{ color: leftColor, borderColor: leftColor }">{{ leftTitle }}</div>
      <div class="sd-compare-body">
        <slot name="left" />
      </div>
    </div>

    <div class="sd-compare-arrow">→</div>

    <div class="sd-compare-panel">
      <div class="sd-compare-header" :style="{ color: rightColor, borderColor: rightColor }">{{ rightTitle }}</div>
      <div class="sd-compare-body">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sd-compare {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: stretch;
  gap: var(--space-4);
}
.sd-compare-panel {
  background: var(--surface-alt);
  border-radius: var(--radius-m);
  padding: var(--space-4);
}
.sd-compare-header {
  font-weight: 700;
  padding-bottom: var(--space-2);
  margin-bottom: var(--space-2);
  border-bottom: 1px solid;
}
.sd-compare-arrow {
  align-self: center;
  color: var(--accent-neutral);
  font-size: var(--text-l);
}
</style>
