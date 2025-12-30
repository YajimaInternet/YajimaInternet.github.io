<template>
  <section class="section">
    <div class="section-head">
      <h2>HTMLミニファイ</h2>
      <span class="hint">コメント削除と空白整理</span>
    </div>
    <div class="card stack">
      <div class="controls">
        <button class="btn btn-primary" type="button" @click="minify">ミニファイ</button>
        <button class="btn btn-secondary" type="button" @click="copy">コピー</button>
        <button class="btn btn-ghost" type="button" @click="clearAll">クリア</button>
      </div>
      <label class="stack">
        入力
        <textarea v-model="source" class="textarea" rows="8" spellcheck="false"></textarea>
      </label>
      <label class="stack">
        出力
        <textarea v-model="result" class="textarea" rows="8" spellcheck="false"></textarea>
      </label>
      <p class="muted">空白は単純に圧縮されます。</p>
      <div class="status" :data-state="ok ? 'ok' : 'error'">{{ status }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'HTMLミニファイ'
});

const source = ref(`<!-- sample -->
<div class="card">
  <h1>Hello</h1>
  <p>YajimaInternet</p>
</div>`);
const result = ref('');
const status = ref('準備完了');
const ok = ref(true);

const setStatus = (msg: string, good = true) => {
  status.value = msg;
  ok.value = good;
};

const minify = () => {
  try {
    let text = source.value || '';
    text = text.replace(/<!--[\s\S]*?-->/g, '');
    text = text.replace(/\s+/g, ' ');
    text = text.replace(/>\s+</g, '><');
    result.value = text.trim();
    setStatus('ミニファイしました', true);
  } catch (e: any) {
    setStatus(`エラー: ${e?.message || ''}`, false);
  }
};

const copy = () => {
  navigator.clipboard?.writeText(result.value || '');
  setStatus('コピーしました', true);
};

const clearAll = () => {
  source.value = '';
  result.value = '';
  setStatus('クリアしました', true);
};
</script>
