<!--
  工程・手順の横フロー図。箇条書きで並べがちな「手順」を横並びの箱+矢印で見せる。
  props:
    steps:    Array<{label: String, sub?: String, icon?: String}>（必須）
              icon は 'i-mdi-robot' 等の UnoCSS アイコンクラス。
              注意: アイコン名は slides.md 内に文字列として直接書くこと（変数で組み立てると
              ビルド時走査で拾われず表示されない）
    numbered: 丸番号を振るか（既定 true）
-->
<script setup>
defineProps({
  steps: { type: Array, required: true },
  numbered: { type: Boolean, default: true },
})
</script>

<template>
  <div class="sd-flowsteps">
    <template v-for="(step, i) in steps" :key="i">
      <div class="sd-flowsteps-box">
        <span class="sd-flowsteps-num" v-if="numbered">{{ i + 1 }}</span>
        <span class="sd-flowsteps-icon" :class="step.icon" v-if="step.icon" />
        <span class="sd-flowsteps-label">{{ step.label }}</span>
        <span class="sd-flowsteps-sub" v-if="step.sub">{{ step.sub }}</span>
      </div>
      <div class="sd-flowsteps-arrow" v-if="i < steps.length - 1" />
    </template>
  </div>
</template>

<style scoped>
.sd-flowsteps {
  display: flex;
  align-items: stretch;
  gap: 0;
}
.sd-flowsteps-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  background: var(--surface-alt);
  border-radius: var(--radius-m);
  padding: var(--space-3) var(--space-4);
  text-align: center;
}
.sd-flowsteps-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.6em;
  height: 1.6em;
  border-radius: var(--radius-pill);
  background: var(--brand-primary);
  color: var(--text-inverse);
  font-weight: 700;
  font-size: var(--text-xs);
}
.sd-flowsteps-icon {
  font-size: var(--text-xl);
  color: var(--brand-primary);
}
.sd-flowsteps-label {
  font-weight: 700;
  font-size: var(--text-s);
}
.sd-flowsteps-sub {
  opacity: 0.65;
  font-size: var(--text-xs);
}
.sd-flowsteps-arrow {
  flex: 0 0 auto;
  align-self: center;
  width: 0;
  height: 0;
  margin: 0 var(--space-2);
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 12px solid var(--accent-neutral);
}
</style>
