<template>
  <section class="section">
    <div class="section-head">
      <h2>URLエンコード</h2>
      <span class="hint">エンコード／デコードとクエリ確認</span>
    </div>
    <div class="grid cols-2">
      <div class="card stack">
        <div class="controls">
          <button class="btn btn-primary" type="button" @click="encode">エンコード</button>
          <button class="btn btn-secondary" type="button" @click="decode">デコード</button>
          <button class="btn btn-ghost" type="button" @click="copy">コピー</button>
          <button class="btn btn-ghost" type="button" @click="clearAll">クリア</button>
        </div>
        <label class="stack">
          入力
          <textarea v-model="source" class="textarea" rows="6"></textarea>
        </label>
        <label class="stack">
          結果
          <textarea v-model="result" class="textarea" rows="6" readonly></textarea>
        </label>
      </div>
      <div class="card stack">
        <p class="muted" style="margin:0;">クエリパラメータ</p>
        <ul class="stack" style="margin:0; padding-left:0; list-style:none;">
          <li v-if="!queryEntries.length" class="muted">クエリはありません。</li>
          <li v-for="entry in queryEntries" :key="entry.key" class="card" style="margin:0; box-shadow:none;">
            <strong>{{ entry.key }}</strong>
            <span class="muted">{{ entry.value || '(空)' }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'URLエンコード'
});

const source = ref('https://example.com/?q=YajimaInternet&lang=ja');
const result = ref('');
const queryEntries = ref<{ key: string; value: string }[]>([]);

const renderQuery = (text: string) => {
  try {
    const url = new URL(text, 'https://example.com');
    const entries = Array.from(url.searchParams.entries());
    queryEntries.value = entries.map(([key, value]) => ({ key, value }));
  } catch (e) {
    queryEntries.value = [];
  }
};

const encode = () => {
  result.value = encodeURIComponent(source.value || '');
  renderQuery(source.value);
};

const decode = () => {
  try {
    result.value = decodeURIComponent(source.value || '');
  } catch (e: any) {
    result.value = `デコードに失敗しました: ${e?.message || ''}`;
  }
  renderQuery(result.value);
};

const copy = () => navigator.clipboard?.writeText(result.value || '');

const clearAll = () => {
  source.value = '';
  result.value = '';
  queryEntries.value = [];
};

onMounted(() => {
  encode();
});
</script>
