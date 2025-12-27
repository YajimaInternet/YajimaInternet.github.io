<template>
  <section class="section">
    <div class="section-head">
      <h2>テキストカウンター</h2>
      <span class="hint">文字数・行数・バイト数</span>
    </div>
    <div class="grid cols-2">
      <div class="card stack">
        <label class="stack">
          テキスト
          <textarea v-model="text" class="textarea" rows="10"></textarea>
        </label>
      </div>
      <div class="card stack">
        <table class="table">
          <tbody>
            <tr><th>文字数</th><td>{{ metrics.chars }}</td></tr>
            <tr><th>スペース除く</th><td>{{ metrics.noSpace }}</td></tr>
            <tr><th>単語数</th><td>{{ metrics.words }}</td></tr>
            <tr><th>行数</th><td>{{ metrics.lines }}</td></tr>
            <tr><th>バイト数 (UTF-8)</th><td>{{ metrics.bytes }}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'テキストカウンター'
});

const text = ref('YajimaInternet sample text\n複数行にも対応します。');
const encoder = new TextEncoder();

const metrics = computed(() => {
  const normalized = text.value.replace(/\r\n?/g, '\n');
  return {
    chars: normalized.length,
    noSpace: normalized.replace(/\s/g, '').length,
    words: normalized.trim() ? normalized.trim().split(/\s+/).length : 0,
    lines: normalized.length ? normalized.split('\n').length : 0,
    bytes: encoder.encode(normalized).length
  };
});
</script>
