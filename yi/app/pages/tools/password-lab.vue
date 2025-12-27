<template>
  <section class="section">
    <div class="section-head">
      <h2>パスワードメーカー</h2>
      <span class="hint">ランダムパスワード / UUID</span>
    </div>
    <div class="card stack">
      <div class="controls">
        <label class="stack" style="width: 180px;">
          文字数: {{ length }}
          <input v-model.number="length" type="range" min="6" max="64" class="input">
        </label>
        <label class="stack" style="width: 120px;">
          個数
          <input v-model.number="count" type="number" min="1" max="6" class="input">
        </label>
        <button class="btn btn-primary" type="button" @click="generate">生成</button>
        <button class="btn btn-secondary" type="button" @click="generateUuid">UUID</button>
      </div>
      <div class="controls">
        <label><input v-model="useLower" type="checkbox"> 小文字</label>
        <label><input v-model="useUpper" type="checkbox"> 大文字</label>
        <label><input v-model="useNumbers" type="checkbox"> 数字</label>
        <label><input v-model="useSymbols" type="checkbox"> 記号</label>
      </div>
      <ul class="stack" style="margin:0; padding-left:0; list-style:none;">
        <li
          v-for="(item, idx) in results"
          :key="idx"
          class="card"
          style="margin:0; box-shadow:none; cursor:pointer;"
          @click="copy(item)"
        >
          <strong>{{ item }}</strong>
          <small class="muted">クリックでコピー</small>
        </li>
        <li v-if="!results.length" class="muted">生成結果がここに表示されます。</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'パスワードメーカー'
});

const length = ref(16);
const count = ref(3);
const useLower = ref(true);
const useUpper = ref(true);
const useNumbers = ref(true);
const useSymbols = ref(false);
const results = ref<string[]>([]);

const pools = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.?/|'
};

const buildPool = () => {
  let pool = '';
  if (useLower.value) pool += pools.lower;
  if (useUpper.value) pool += pools.upper;
  if (useNumbers.value) pool += pools.numbers;
  if (useSymbols.value) pool += pools.symbols;
  return pool || pools.lower;
};

const generateOne = () => {
  const pool = buildPool();
  const len = Math.min(Math.max(length.value, 1), 64);
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  let out = '';
  for (let i = 0; i < len; i += 1) {
    out += pool[bytes[i] % pool.length];
  }
  return out;
};

const generate = () => {
  const c = Math.min(Math.max(count.value, 1), 6);
  results.value = Array.from({ length: c }, () => generateOne());
};

const generateUuid = () => {
  results.value = [crypto.randomUUID()];
};

const copy = (text: string) => {
  navigator.clipboard?.writeText(text);
};

onMounted(generate);
</script>
