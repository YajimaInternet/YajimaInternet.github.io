<template>
  <section class="section">
    <div class="section-head">
      <h2>正規表現テスター</h2>
      <span class="hint">パターンとフラグでハイライト</span>
    </div>
    <div class="card stack">
      <div class="grid-2">
        <label class="stack">
          パターン
          <input v-model="pattern" class="input" placeholder="\\b[a-z]+\\b">
        </label>
        <label class="stack">
          フラグ (g は自動付与)
          <input v-model="flags" class="input" placeholder="gi">
        </label>
      </div>
      <label class="stack">
        対象テキスト
        <textarea v-model="sample" class="textarea" rows="8"></textarea>
      </label>
      <div class="controls">
        <button class="btn btn-primary" type="button" @click="highlight">実行</button>
        <button class="btn btn-ghost" type="button" @click="reset">リセット</button>
      </div>
      <p class="lede">{{ summary }}</p>
      <div class="card" style="margin:0; box-shadow:none; background: var(--card); border: 1px dashed var(--border);">
      <p v-if="outputSegments.length">
        <template v-for="(seg, idx) in outputSegments" :key="idx">
          <mark v-if="seg.type === 'mark'">{{ seg.text }}</mark>
          <span v-else>{{ seg.text }}</span>
        </template>
      </p>
      <p v-else class="muted">{{ outputMessage }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: '正規表現テスター'
});

const pattern = ref('\\b[a-z]+\\b');
const flags = ref('gi');
const sample = ref('Hello regex world. regex is handy.');
const summary = ref('パターンを入力してください');
type Segment = { type: 'text' | 'mark'; text: string };

const outputSegments = ref<Segment[]>([]);
const outputMessage = ref('入力待ち');

const highlight = () => {
  const pat = pattern.value;
  let flg = flags.value.replace(/[^gimsuy]/g, '');
  const text = sample.value;
  if (!pat) {
    summary.value = 'パターンを入力してください';
    outputSegments.value = [];
    outputMessage.value = '入力待ち';
    return;
  }
  try {
    if (!flg.includes('g')) flg += 'g';
    const regex = new RegExp(pat, flg);
    let match: RegExpExecArray | null;
    let count = 0;
    let last = 0;
    const segments: Segment[] = [];
    regex.lastIndex = 0;
    while ((match = regex.exec(text)) !== null) {
      const hit = match[0] || '';
      if (match.index > last) {
        segments.push({ type: 'text', text: text.slice(last, match.index) });
      }
      segments.push({ type: 'mark', text: hit });
      last = regex.lastIndex;
      count += 1;
      if (hit === '') {
        regex.lastIndex += 1;
      }
    }
    if (last < text.length) {
      segments.push({ type: 'text', text: text.slice(last) });
    }
    summary.value = `一致: ${count} 件 / フラグ: ${flg}`;
    outputSegments.value = segments;
    outputMessage.value = segments.length ? '' : '一致なし';
  } catch (e: any) {
    summary.value = `エラー: ${e?.message || ''}`;
    outputSegments.value = [];
    outputMessage.value = 'パターンまたはフラグが不正です';
  }
};

const reset = () => {
  pattern.value = '\\b[a-z]+\\b';
  flags.value = 'gi';
  sample.value = 'Hello regex world. regex is handy.';
  highlight();
};

onMounted(highlight);
</script>
