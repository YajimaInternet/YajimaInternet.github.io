<template>
  <section class="section">
    <div class="section-head">
      <h2>HTMLエンティティ</h2>
      <span class="hint">エンコード / デコード</span>
    </div>
    <div class="card stack">
      <div class="controls">
        <button class="btn btn-primary" type="button" @click="encode">エンコード</button>
        <button class="btn btn-secondary" type="button" @click="decode">デコード</button>
        <button class="btn btn-secondary" type="button" @click="copy">コピー</button>
        <button class="btn btn-ghost" type="button" @click="clearAll">クリア</button>
      </div>
      <div class="grid-2">
        <label class="stack">
          入力
          <textarea v-model="source" class="textarea" rows="8" spellcheck="false"></textarea>
        </label>
        <label class="stack">
          出力
          <textarea v-model="result" class="textarea" rows="8" spellcheck="false"></textarea>
        </label>
      </div>
      <div class="status" :data-state="ok ? 'ok' : 'error'">{{ status }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'HTMLエンティティ'
});

const source = ref('<div class="hello">Yajima & Internet</div>');
const result = ref('');
const status = ref('準備完了');
const ok = ref(true);

const setStatus = (msg: string, good = true) => {
  status.value = msg;
  ok.value = good;
};

const encode = () => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  result.value = (source.value || '').replace(/[&<>"']/g, (m) => map[m]);
  setStatus('エンコードしました', true);
};

const decode = () => {
  try {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = source.value || '';
    result.value = textarea.value;
    setStatus('デコードしました', true);
  } catch (e: any) {
    setStatus(`デコード失敗: ${e?.message || ''}`, false);
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
