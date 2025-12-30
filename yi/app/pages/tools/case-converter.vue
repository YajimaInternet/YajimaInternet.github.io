<template>
  <section class="section">
    <div class="section-head">
      <h2>ケース変換</h2>
      <span class="hint">camel / snake / kebab / title</span>
    </div>
    <div class="grid cols-2">
      <div class="card stack">
        <label class="stack">
          入力
          <textarea v-model="source" class="textarea" rows="10" spellcheck="false"></textarea>
        </label>
      </div>
      <div class="card stack">
        <table class="table">
          <tbody>
            <tr>
              <th>camelCase</th>
              <td>{{ outputs.camel }}</td>
              <td><button class="btn btn-secondary" type="button" @click="copy(outputs.camel)">コピー</button></td>
            </tr>
            <tr>
              <th>PascalCase</th>
              <td>{{ outputs.pascal }}</td>
              <td><button class="btn btn-secondary" type="button" @click="copy(outputs.pascal)">コピー</button></td>
            </tr>
            <tr>
              <th>snake_case</th>
              <td>{{ outputs.snake }}</td>
              <td><button class="btn btn-secondary" type="button" @click="copy(outputs.snake)">コピー</button></td>
            </tr>
            <tr>
              <th>kebab-case</th>
              <td>{{ outputs.kebab }}</td>
              <td><button class="btn btn-secondary" type="button" @click="copy(outputs.kebab)">コピー</button></td>
            </tr>
            <tr>
              <th>UPPER</th>
              <td>{{ outputs.upper }}</td>
              <td><button class="btn btn-secondary" type="button" @click="copy(outputs.upper)">コピー</button></td>
            </tr>
            <tr>
              <th>lower</th>
              <td>{{ outputs.lower }}</td>
              <td><button class="btn btn-secondary" type="button" @click="copy(outputs.lower)">コピー</button></td>
            </tr>
            <tr>
              <th>Title Case</th>
              <td>{{ outputs.title }}</td>
              <td><button class="btn btn-secondary" type="button" @click="copy(outputs.title)">コピー</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'ケース変換'
});

const source = ref('Yajima Internet sample_text');

const splitWords = (text: string) => {
  return text
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
};

const cap = (word: string) => {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

const outputs = computed(() => {
  const words = splitWords(source.value || '');
  if (!words.length) {
    return {
      camel: '',
      pascal: '',
      snake: '',
      kebab: '',
      upper: '',
      lower: '',
      title: ''
    };
  }
  const lower = words.map((w) => w.toLowerCase());
  return {
    camel: lower[0] + lower.slice(1).map(cap).join(''),
    pascal: lower.map(cap).join(''),
    snake: lower.join('_'),
    kebab: lower.join('-'),
    upper: words.join(' ').toUpperCase(),
    lower: words.join(' ').toLowerCase(),
    title: lower.map(cap).join(' ')
  };
});

const copy = (text: string) => {
  navigator.clipboard?.writeText(text || '');
};
</script>
