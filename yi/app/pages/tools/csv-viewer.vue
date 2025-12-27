<template>
  <section class="section">
    <div class="section-head">
      <h2>CSVプレビュー</h2>
      <span class="hint">貼り付けてテーブル表示</span>
    </div>
    <div class="card stack">
      <div class="controls">
        <label class="stack" style="width: 140px;">
          区切り文字
          <input v-model="delimiter" class="input" placeholder=",">
        </label>
        <button class="btn btn-primary" type="button" @click="render">表示</button>
        <button class="btn btn-ghost" type="button" @click="clearAll">クリア</button>
      </div>
      <label class="stack">
        CSV
        <textarea v-model="csv" class="textarea" rows="8"></textarea>
      </label>
      <div class="card" style="margin:0; box-shadow:none; overflow:auto;">
        <table class="table" v-if="rows.length">
          <thead>
            <tr>
              <th v-for="(h, idx) in headers" :key="idx">{{ h }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rIdx) in rows" :key="rIdx">
              <td v-for="(h, cIdx) in headers" :key="cIdx">{{ row[cIdx] ?? '' }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else class="muted">入力がありません。</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'CSVプレビュー'
});

const delimiter = ref(',');
const csv = ref('name,age\nAlice,24\nBob,30');
const headers = ref<string[]>([]);
const rows = ref<string[][]>([]);

const render = () => {
  const delim = delimiter.value || ',';
  const lines = csv.value.replace(/\r\n?/g, '\n').split('\n').filter((l) => l.length);
  if (!lines.length) {
    headers.value = [];
    rows.value = [];
    return;
  }
  const parsed = lines.map((line) => line.split(delim));
  const maxCols = Math.max(...parsed.map((r) => r.length));
  headers.value = Array.from({ length: maxCols }, (_, i) => `Col ${i + 1}`);
  rows.value = parsed;
};

const clearAll = () => {
  csv.value = '';
  headers.value = [];
  rows.value = [];
};

watch([csv, delimiter], render, { immediate: true });
</script>
