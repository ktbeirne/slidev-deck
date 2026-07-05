<!--
  会話例（チャット再現）。ユーザ⇄AIのやり取りを最小限の吹き出しで示す要素部品。
  題材依存（AI・対話UI系）のためページ型ではない。該当する題材のときのみ使う。
  default スロットに ChatBubble を並べる。話者ラベルは付けない
  （右寄せ=ユーザ・左寄せ=AI のチャット慣例と発話内容で判別させる）。
  slots:
    default: ChatBubble の列
    note:    やり取りの内部で起きたことの補足（任意。dim表示）
-->
<template>
  <div class="sd-chat">
    <slot />
    <p v-if="$slots.note" class="sd-chat-note dim"><slot name="note" /></p>
  </div>
</template>

<style scoped>
/* コンテンツ幅62%を中央配置（ブロック配置であり text-align ではない。
   本文の中央揃え禁止には抵触しない） */
.sd-chat { width: 62%; margin: var(--space-6) auto 0 auto; display: flex; flex-direction: column; }
.sd-chat-note { font-size: var(--text-s); margin: var(--space-4) 0 0 0; }
</style>
