<template>
  <section class="section">
    <div class="section-head">
      <h2>JSON→CSV</h2>
      <span class="hint">配列JSONをCSVへ変換</span>
    </div>
    <div class="card stack">
      <div class="controls">
        <button class="btn btn-primary" type="button" @click="convert">変換</button>
        <button class="btn btn-secondary" type="button" @click="copy">コピー</button>
        <button class="btn btn-ghost" type="button" @click="clearAll">クリア</button>
      </div>
      <div class="grid-2">
        <label class="stack">
          JSON
          <textarea v-model="source" class="textarea" rows="10" spellcheck="false"></textarea>
        </label>
        <label class="stack">
          CSV
          <textarea v-model="result" class="textarea" rows="10" spellcheck="false"></textarea>
        </label>
      </div>
      <div class="status" :data-state="ok ? 'ok' : 'error'">{{ status }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'JSON→CSV'
});

const source = ref('[{"name":"Alice","age":20},{"name":"Bob","age":22,"role":"dev"}]');
const result = ref('');
const status = ref('準備完了');
const ok = ref(true);

const setStatus = (msg: string, good = true) => {
  status.value = msg;
  ok.value = good;
};

const escapeCsv = (value: unknown) => {
  const str = value === null || value === undefined ? '' : String(value);
  if (/[",\n]/.test(str)) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
};

const convert = () => {
  try {
    const parsed = JSON.parse(source.value || '');
    if (!Array.isArray(parsed)) {
      setStatus('配列JSONを入力してください', false);
      return;
    }
    const rows = parsed.filter((item) => item && typeof item === 'object');
    const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
    if (headers.length === 0) {
      result.value = '';
      setStatus('変換対象がありません', false);
      return;
    }
    const lines = [
      headers.join(','),
      ...rows.map((row) => headers.map((key) => escapeCsv((row as Record<string, unknown>)[key])).join(','))
    ];
    result.value = lines.join('\n');
    setStatus('変換しました', true);
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
