<template>
  <section class="section">
    <div class="section-head">
      <h2>Lorem生成</h2>
      <span class="hint">ダミーテキスト作成</span>
    </div>
    <div class="card stack">
      <div class="controls">
        <label class="stack">
          量
          <input v-model.number="count" type="number" min="1" class="input">
        </label>
        <label class="stack">
          単位
          <select v-model="mode" class="input">
            <option value="words">単語</option>
            <option value="sentences">文</option>
            <option value="paragraphs">段落</option>
          </select>
        </label>
        <button class="btn btn-primary" type="button" @click="generate">生成</button>
        <button class="btn btn-secondary" type="button" @click="copy">コピー</button>
        <button class="btn btn-ghost" type="button" @click="clearAll">クリア</button>
      </div>
      <label class="stack">
        出力
        <textarea v-model="output" class="textarea" rows="10" spellcheck="false"></textarea>
      </label>
      <div class="status" :data-state="ok ? 'ok' : 'error'">{{ status }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'Lorem生成'
});

const words = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate',
  'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur'
];

const count = ref(24);
const mode = ref<'words' | 'sentences' | 'paragraphs'>('words');
const output = ref('');
const status = ref('準備完了');
const ok = ref(true);

const setStatus = (msg: string, good = true) => {
  status.value = msg;
  ok.value = good;
};

const pickWord = () => words[Math.floor(Math.random() * words.length)];

const makeWords = (n: number) => {
  const list = Array.from({ length: n }, pickWord);
  return list.join(' ');
};

const makeSentence = () => {
  const len = 4 + Math.floor(Math.random() * 8);
  const sentence = makeWords(len);
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
};

const makeParagraph = () => {
  const count = 2 + Math.floor(Math.random() * 4);
  return Array.from({ length: count }, makeSentence).join(' ');
};

const generate = () => {
  const n = Math.max(1, Number(count.value) || 1);
  let text = '';
  if (mode.value === 'words') {
    text = makeWords(n);
  } else if (mode.value === 'sentences') {
    text = Array.from({ length: n }, makeSentence).join(' ');
  } else {
    text = Array.from({ length: n }, makeParagraph).join('\n\n');
  }
  output.value = text;
  setStatus('生成しました', true);
};

const copy = () => {
  navigator.clipboard?.writeText(output.value || '');
  setStatus('コピーしました', true);
};

const clearAll = () => {
  output.value = '';
  setStatus('クリアしました', true);
};
</script>
