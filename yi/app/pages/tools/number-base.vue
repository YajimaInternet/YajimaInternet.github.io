<template>
  <section class="section">
    <div class="section-head">
      <h2>進数変換</h2>
      <span class="hint">10進 / 16進 / 2進</span>
    </div>
    <div class="card stack">
      <div class="controls">
        <label class="stack">
          入力
          <input v-model="value" class="input" placeholder="例: FF">
        </label>
        <label class="stack">
          基数
          <select v-model.number="base" class="input">
            <option :value="10">10進</option>
            <option :value="16">16進</option>
            <option :value="2">2進</option>
          </select>
        </label>
      </div>
      <table class="table">
        <tbody>
          <tr>
            <th>10進</th>
            <td>{{ outputs.dec }}</td>
            <td><button class="btn btn-secondary" type="button" @click="copy(outputs.dec)">コピー</button></td>
          </tr>
          <tr>
            <th>16進</th>
            <td>{{ outputs.hex }}</td>
            <td><button class="btn btn-secondary" type="button" @click="copy(outputs.hex)">コピー</button></td>
          </tr>
          <tr>
            <th>2進</th>
            <td>{{ outputs.bin }}</td>
            <td><button class="btn btn-secondary" type="button" @click="copy(outputs.bin)">コピー</button></td>
          </tr>
        </tbody>
      </table>
      <div class="status" :data-state="ok ? 'ok' : 'error'">{{ status }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: '進数変換'
});

const value = ref('255');
const base = ref(10);

const parsed = computed(() => {
  const raw = value.value.trim();
  if (!raw) return null;
  const num = parseInt(raw, base.value);
  if (Number.isNaN(num)) return null;
  return num;
});

const outputs = computed(() => {
  if (parsed.value === null) {
    return { dec: '', hex: '', bin: '' };
  }
  return {
    dec: String(parsed.value),
    hex: parsed.value.toString(16).toUpperCase(),
    bin: parsed.value.toString(2)
  };
});

const status = computed(() => {
  if (!value.value.trim()) return '入力待ち';
  return parsed.value === null ? '入力が不正です' : '変換しました';
});

const ok = computed(() => parsed.value !== null || !value.value.trim());

const copy = (text: string) => {
  navigator.clipboard?.writeText(text || '');
};
</script>
