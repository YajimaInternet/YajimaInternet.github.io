<template>
  <section class="section">
    <div class="section-head">
      <h2>JS難読化</h2>
      <span class="hint">Base64ラップの簡易難読化</span>
    </div>
    <div class="card stack">
      <div class="controls">
        <button class="btn btn-primary" type="button" @click="encode">難読化</button>
        <button class="btn btn-secondary" type="button" @click="decode">復号</button>
        <button class="btn btn-secondary" type="button" @click="copy">コピー</button>
        <button class="btn btn-ghost" type="button" @click="clearAll">クリア</button>
      </div>
      <label class="stack">
        元コード
        <textarea v-model="source" class="textarea" rows="8" spellcheck="false"></textarea>
      </label>
      <label class="stack">
        出力
        <textarea v-model="result" class="textarea" rows="8" spellcheck="false"></textarea>
      </label>
      <label class="stack">
        オプション
        <label>
          <input v-model="wrap" type="checkbox">
          実行ラッパーを付ける
        </label>
      </label>
      <div class="status" :data-state="ok ? 'ok' : 'error'">{{ status }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'JS難読化'
});

const source = ref('console.log("YajimaInternet");');
const result = ref('');
const wrap = ref(true);
const status = ref('準備完了');
const ok = ref(true);

const setStatus = (msg: string, good = true) => {
  status.value = msg;
  ok.value = good;
};

const toBase64 = (text: string) => {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join('');
  return btoa(binary);
};

const fromBase64 = (text: string) => {
  const binary = atob(text);
  const arr = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  const decoder = new TextDecoder();
  return decoder.decode(arr);
};

const wrapCode = (base64: string) => `(function(){
  const d='${base64}';
  const b=Uint8Array.from(atob(d),c=>c.charCodeAt(0));
  const t=new TextDecoder().decode(b);
  return Function(t)();
})();`;

const encode = () => {
  const base64 = toBase64(source.value || '');
  result.value = wrap.value ? wrapCode(base64) : base64;
  setStatus('難読化しました', true);
};

const decode = () => {
  const raw = (result.value || source.value || '').trim();
  const match = raw.match(/const d='([^']+)'/);
  const base64 = match ? match[1] : raw;
  try {
    source.value = fromBase64(base64);
    setStatus('復号しました', true);
  } catch (e: any) {
    setStatus(`復号できません: ${e?.message || ''}`, false);
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
