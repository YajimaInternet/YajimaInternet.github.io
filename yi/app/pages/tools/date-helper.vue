<template>
  <section class="section">
    <div class="section-head">
      <h2>日付差分チェッカー</h2>
      <span class="hint">差分計算と日数加算</span>
    </div>
    <div class="card stack">
      <div class="grid-2">
        <label class="stack">
          開始日
          <input v-model="start" type="date" class="input">
        </label>
        <label class="stack">
          終了日
          <input v-model="end" type="date" class="input">
        </label>
      </div>
      <div class="grid-2">
        <div class="card" style="margin:0; box-shadow:none;">
          <p class="muted" style="margin:0;">差分</p>
          <p class="lede">{{ diffDays }} 日</p>
          <p class="muted">{{ diffHours }} 時間</p>
          <p class="muted">{{ diffMinutes }} 分</p>
        </div>
        <div class="card stack" style="margin:0; box-shadow:none;">
          <label class="stack">
            開始日に加算する日数
            <input v-model.number="addDays" type="number" class="input" placeholder="7">
          </label>
          <button class="btn btn-secondary" type="button" @click="applyAdd">計算</button>
          <p class="lede">{{ addResult }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: '日付差分チェッカー'
});

const pad = (n: number) => String(n).padStart(2, '0');

const today = new Date();
const nextWeek = new Date();
nextWeek.setDate(today.getDate() + 7);

const start = ref(today.toISOString().slice(0, 10));
const end = ref(nextWeek.toISOString().slice(0, 10));
const addDays = ref(0);
const addResult = ref('');

const diffMs = computed(() => {
  const s = start.value ? new Date(start.value) : null;
  const e = end.value ? new Date(end.value) : null;
  if (!s || !e || Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return 0;
  return e.getTime() - s.getTime();
});

const diffDays = computed(() => Math.round(diffMs.value / 86400000));
const diffHours = computed(() => Math.round(diffMs.value / 3600000));
const diffMinutes = computed(() => Math.round(diffMs.value / 60000));

const applyAdd = () => {
  const s = start.value ? new Date(start.value) : null;
  if (!s || Number.isNaN(s.getTime())) {
    addResult.value = '開始日を入力してください';
    return;
  }
  const d = parseInt(String(addDays.value), 10) || 0;
  const added = new Date(s);
  added.setDate(added.getDate() + d);
  addResult.value = `開始日 + ${d}日 = ${added.getFullYear()}-${pad(added.getMonth() + 1)}-${pad(added.getDate())}`;
};
</script>
