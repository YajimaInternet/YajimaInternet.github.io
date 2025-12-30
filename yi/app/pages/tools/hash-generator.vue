<template>
  <section class="section">
    <div class="section-head">
      <h2>ハッシュ計算</h2>
      <span class="hint">SHA系のダイジェスト生成</span>
    </div>
    <div class="card stack">
      <div class="controls">
        <label class="stack">
          アルゴリズム
          <select v-model="algo" class="input">
            <option value="SHA-1">SHA-1</option>
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </label>
        <button class="btn btn-primary" type="button" @click="generate">生成</button>
        <button class="btn btn-secondary" type="button" @click="copy">コピー</button>
      </div>
      <label class="stack">
        入力
        <textarea v-model="source" class="textarea" rows="6" spellcheck="false"></textarea>
      </label>
      <label class="stack">
        出力
        <textarea v-model="result" class="textarea" rows="3" spellcheck="false" readonly></textarea>
      </label>
      <div class="status" :data-state="ok ? 'ok' : 'error'">{{ status }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'ハッシュ計算'
});

const source = ref('YajimaInternet');
const algo = ref('SHA-256');
const result = ref('');
const status = ref('準備完了');
const ok = ref(true);

const setStatus = (msg: string, good = true) => {
  status.value = msg;
  ok.value = good;
};

const toHex = (buffer: ArrayBuffer) => {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const generate = async () => {
  try {
    const data = new TextEncoder().encode(source.value || '');
    const hash = await crypto.subtle.digest(algo.value, data);
    result.value = toHex(hash);
    setStatus('生成しました', true);
  } catch (e: any) {
    setStatus(`エラー: ${e?.message || ''}`, false);
  }
};

const copy = () => {
  navigator.clipboard?.writeText(result.value || '');
  setStatus('コピーしました', true);
};
</script>
