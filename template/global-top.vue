<!--
  Slidevグローバルレイヤー（全スライド共通・トップ）
  $slidev.configs.frame（値: none | topline | band | sideline | titlebar、未指定=none）を読み、
  topline / band / sideline のときだけ全面オーバーレイ .sd-frame を描画する（pointer-events: none）。
  titlebar の帯は layouts/base.vue の責務、none は何も描画しない。
  加えて、表紙（layout: cover）以外のページにフッタ（左=タイトル、右=現在ページ）を描画する。
-->
<script setup>
const OVERLAY_FRAMES = ['topline', 'band', 'sideline']
</script>

<template>
  <div
    class="sd-frame"
    :class="`frame-${$slidev.configs.frame || 'none'}`"
    v-if="OVERLAY_FRAMES.includes($slidev.configs.frame)"
  />

  <footer class="sf-frame-footer" v-if="$slidev.nav.currentLayout !== 'cover'">
    <span>{{ $slidev.configs.title }}</span>
    <span>{{ $slidev.nav.currentPage }}</span>
  </footer>
</template>
