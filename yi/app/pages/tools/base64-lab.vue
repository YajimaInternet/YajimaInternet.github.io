<template>
  <section class="section">
    <div class="section-head">
      <h2>Base64ラボ</h2>
      <span class="hint">文字列のBase64変換</span>
    </div>
    <div class="card stack">
      <div class="controls">
        <button class="btn btn-primary" type="button" @click="encode">エンコード</button>
        <button class="btn btn-secondary" type="button" @click="decode">デコード</button>
        <button class="btn btn-secondary" type="button" @click="copy">コピー</button>
        <button class="btn btn-ghost" type="button" @click="swap">上下入れ替え</button>
      </div>
      <div class="grid-2">
        <label class="stack">
          プレーン
          <textarea v-model="plain" class="textarea" placeholder="任意の文字列を入力"></textarea>
        </label>
        <label class="stack">
          Base64
          <textarea v-model="b64" class="textarea" placeholder="Base64文字列"></textarea>
        </label>
      </div>
      <p class="muted">UTF-8でエンコード／デコードします。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'Base64ラボ'
});

const plain = ref('YajimaInternet Base64 ラボ');
const b64 = ref('');

const encode = () => {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(plain.value || '');
  const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join('');
  b64.value = btoa(binary);
};

const decode = () => {
  try {
    const binary = atob(b64.value || '');
    const arr = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const decoder = new TextDecoder();
    plain.value = decoder.decode(arr);
  } catch (e: any) {
    plain.value = `デコードに失敗しました: ${e?.message || ''}`;
  }
};

const copy = () => {
  navigator.clipboard?.writeText(b64.value || plain.value || '');
};

const swap = () => {
  const tmp = plain.value;
  plain.value = b64.value;
  b64.value = tmp;
};

onMounted(() => {
  encode();
});
</script>
