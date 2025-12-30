<template>
  <section class="section">
    <div class="section-head">
      <h2>UNIX時間</h2>
      <span class="hint">エポック秒と日時の相互変換</span>
    </div>
    <div class="card stack">
      <div class="grid-2">
        <label class="stack">
          日時 (ローカル)
          <input v-model="dateInput" type="datetime-local" class="input">
        </label>
        <label class="stack">
          UNIX秒
          <input v-model="timestamp" type="number" class="input">
        </label>
      </div>
      <div class="controls">
        <button class="btn btn-primary" type="button" @click="toTimestamp">→ UNIX秒</button>
        <button class="btn btn-secondary" type="button" @click="toDate">→ 日時</button>
        <button class="btn btn-ghost" type="button" @click="setNow">今の時刻</button>
      </div>
      <p class="muted">UTC: {{ utcString }}</p>
      <div class="status" :data-state="ok ? 'ok' : 'error'">{{ status }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'UNIX時間'
});

const pad = (n: number) => String(n).padStart(2, '0');

const toLocalInput = (date: Date) => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const dateInput = ref(toLocalInput(new Date()));
const timestamp = ref(Math.floor(Date.now() / 1000).toString());
const status = ref('準備完了');
const ok = ref(true);

const setStatus = (msg: string, good = true) => {
  status.value = msg;
  ok.value = good;
};

const toTimestamp = () => {
  const date = new Date(dateInput.value);
  if (Number.isNaN(date.getTime())) {
    setStatus('日時が不正です', false);
    return;
  }
  timestamp.value = Math.floor(date.getTime() / 1000).toString();
  setStatus('変換しました', true);
};

const toDate = () => {
  const sec = Number(timestamp.value);
  if (!Number.isFinite(sec)) {
    setStatus('UNIX秒が不正です', false);
    return;
  }
  const date = new Date(sec * 1000);
  dateInput.value = toLocalInput(date);
  setStatus('変換しました', true);
};

const setNow = () => {
  const now = new Date();
  dateInput.value = toLocalInput(now);
  timestamp.value = Math.floor(now.getTime() / 1000).toString();
  setStatus('現在時刻に更新しました', true);
};

const utcString = computed(() => {
  const sec = Number(timestamp.value);
  if (!Number.isFinite(sec)) return '';
  return new Date(sec * 1000).toUTCString();
});
</script>
