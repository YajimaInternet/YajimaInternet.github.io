<template>
  <section class="section">
    <div class="section-head">
      <h2>行ツール</h2>
      <span class="hint">並べ替え・重複除去・トリム</span>
    </div>
    <div class="card stack">
      <div class="controls">
        <button class="btn btn-primary" type="button" @click="sortMode = 'asc'">昇順</button>
        <button class="btn btn-secondary" type="button" @click="sortMode = 'desc'">降順</button>
        <button class="btn btn-ghost" type="button" @click="sortMode = 'none'">元の順</button>
        <button class="btn btn-secondary" type="button" @click="copy">コピー</button>
      </div>
      <div class="controls">
        <label>
          <input v-model="trim" type="checkbox">
          前後空白を削除
        </label>
        <label>
          <input v-model="unique" type="checkbox">
          重複を削除
        </label>
        <label>
          <input v-model="removeEmpty" type="checkbox">
          空行を削除
        </label>
        <label>
          <input v-model="reverse" type="checkbox">
          逆順にする
        </label>
      </div>
      <div class="grid-2">
        <label class="stack">
          入力
          <textarea v-model="source" class="textarea" rows="10" spellcheck="false"></textarea>
        </label>
        <label class="stack">
          出力
          <textarea :value="result" class="textarea" rows="10" spellcheck="false" readonly></textarea>
        </label>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: '行ツール'
});

const source = ref('orange\napple\nbanana\napple');
const sortMode = ref<'none' | 'asc' | 'desc'>('asc');
const trim = ref(true);
const unique = ref(false);
const removeEmpty = ref(true);
const reverse = ref(false);

const result = computed(() => {
  const normalized = (source.value || '').replace(/\r\n?/g, '\n');
  let lines = normalized.split('\n');

  if (trim.value) {
    lines = lines.map((line) => line.trim());
  }

  if (removeEmpty.value) {
    lines = lines.filter((line) => line.length > 0);
  }

  if (unique.value) {
    const seen = new Set<string>();
    lines = lines.filter((line) => {
      if (seen.has(line)) return false;
      seen.add(line);
      return true;
    });
  }

  if (sortMode.value !== 'none') {
    lines = [...lines].sort((a, b) => a.localeCompare(b, 'ja'));
    if (sortMode.value === 'desc') {
      lines.reverse();
    }
  }

  if (reverse.value) {
    lines = [...lines].reverse();
  }

  return lines.join('\n');
});

const copy = () => {
  navigator.clipboard?.writeText(result.value || '');
};
</script>
