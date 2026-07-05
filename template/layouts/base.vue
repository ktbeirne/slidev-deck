<!--
  汎用本文レイアウト
  frontmatter:
    heading: 見出し（上部）。空なら表紙的に何も出さない
    align:   本文の縦位置。'center'（既定）| 'top'
  frame分岐: $slidev.configs.frame === 'titlebar' のときだけ見出しを
  frames.css 定義済みの .sf-frame-titlebar（高さ88px・帯背景）の中に描画し、
  本文側はその高さぶん上余白を確保する。それ以外のframe値では通常位置に見出しを描画する。
-->
<script setup>
defineProps({
  heading: { type: String, default: '' },
  // 本文の縦位置。既定は中央寄せ。図・カード群など要素が複数個並ぶスライドは 'top' で上揃え
  align: { type: String, default: 'center' },
})
</script>

<template>
  <div class="sd-slide">
    <!-- titlebarフレーム時: 見出しを帯の中に描画 -->
    <div class="sf-frame-titlebar" v-if="heading && $slidev.configs.frame === 'titlebar'">
      {{ heading }}
    </div>

    <!-- 通常時: 見出しを上部に描画 -->
    <header class="sd-header" v-else-if="heading">
      <h1 class="sd-title">{{ heading }}</h1>
    </header>

    <!-- 本文 -->
    <main
      class="sd-main"
      :class="[align === 'top' ? 'top' : '', $slidev.configs.frame === 'titlebar' ? 'with-titlebar' : '']"
    >
      <slot />
    </main>
  </div>
</template>

<style scoped>
.sd-slide {
  position: absolute;
  inset: 0;
  background: var(--surface);
  padding: 0;
}
.sd-header {
  position: absolute;
  top: 14px;
  left: 34px;
  right: 28px;
  display: flex;
  align-items: flex-start;
}
.sd-title {
  font-family: var(--font-title);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--heading-color);
  margin: 0;
  line-height: 1.25;
}
.sd-main {
  position: absolute;
  top: 96px;
  left: 56px;
  right: 40px;
  bottom: 34px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* 図・カード群など要素が複数個並ぶスライドは上揃えに戻す */
.sd-main.top { justify-content: flex-start; }
/* titlebarフレーム時: 見出しが帯(88px)に移るぶん本文の上余白を広げる */
.sd-main.with-titlebar { top: 88px; }
</style>
