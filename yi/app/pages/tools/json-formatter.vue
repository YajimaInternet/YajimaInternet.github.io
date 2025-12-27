<template>
  <section class="section">
    <div class="section-head">
      <h2>JSONフォーマッタ</h2>
      <span class="hint">整形・圧縮・検証</span>
    </div>
    <div class="card stack">
      <div class="controls">
        <button class="btn btn-primary" type="button" @click="process(true)">整形 (2スペース)</button>
        <button class="btn btn-secondary" type="button" @click="process(false)">圧縮</button>
        <button class="btn btn-secondary" type="button" @click="copy">コピー</button>
        <button class="btn btn-ghost" type="button" @click="clearAll">クリア</button>
      </div>
      <label class="stack">
        JSON
        <textarea v-model="text" class="textarea" spellcheck="false" placeholder='{\"hello\":\"world\"}'></textarea>
      </label>
      <div class="status" :data-state="ok ? 'ok' : 'error'">{{ status }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'JSONフォーマッタ'
});

const text = ref('{"message":"hello","count":2,"items":[1,2,3]}');
const status = ref('準備完了');
const ok = ref(true);

const setStatus = (msg: string, good = true) => {
  status.value = msg;
  ok.value = good;
};

const process = (pretty: boolean) => {
  try {
    const parsed = JSON.parse(text.value);
    text.value = pretty ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed);
    setStatus(pretty ? '整形しました' : '圧縮しました', true);
  } catch (e: any) {
    setStatus(`エラー: ${e?.message || ''}`, false);
  }
};

const copy = () => {
  navigator.clipboard?.writeText(text.value || '');
  setStatus('コピーしました', true);
};

const clearAll = () => {
  text.value = '';
  setStatus('クリアしました', true);
};
</script>
