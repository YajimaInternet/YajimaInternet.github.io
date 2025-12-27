<template>
  <section class="section">
    <div class="section-head">
      <h2>Tools</h2>
      <span class="hint">ちょっと便利なツール集</span>
    </div>
    <div class="grid cols-2">
      <NuxtLink v-for="tool in tools" :key="tool.to" :to="tool.to" class="card" style="text-decoration: none;">
        <h3>{{ tool.name }}</h3>
        <p class="lede" style="margin: 6px 0 0;">{{ tool.desc }}</p>
      </NuxtLink>
    </div>
    <div class="card" style="margin-top: 16px;">
      <p class="lede">Digital Clock は従来のページをそのまま公開しています。</p>
      <a href="/tools/Digital%20Clock/digital%20clock.html" class="btn btn-secondary" style="margin-top: 8px;">Digital Clock を開く</a>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'Tools'
});

const tools = [
  { name: 'Base64ラボ', to: '/tools/base64-lab', desc: '文字列のBase64エンコード／デコード。コピー・入れ替えも対応。' },
  { name: 'カラーピッカー', to: '/tools/color-lab', desc: 'HEX/RGB/HSLと明るさ調整。ワンクリックでコピーも。' },
  { name: 'JSONフォーマッタ', to: '/tools/json-formatter', desc: 'JSONの整形／圧縮とバリデーション。' },
  { name: 'Markdownプレビュー', to: '/tools/markdown-preview', desc: 'Markdownをその場でHTMLプレビュー。' },
  { name: 'メモ帳', to: '/tools/notepad', desc: 'ブラウザ保存付きのシンプルメモ。' },
  { name: '正規表現テスター', to: '/tools/regex-tester', desc: 'パターンとフラグを指定してマッチ確認。' },
  { name: 'URLエンコード', to: '/tools/url-encoder', desc: 'URLのエンコード／デコード。クエリの確認も。' },
  { name: 'テキストカウンター', to: '/tools/text-metrics', desc: '文字数・行数・バイト数をカウント。' },
  { name: 'パスワードメーカー', to: '/tools/password-lab', desc: 'ランダムなパスワードやUUIDを生成。' },
  { name: 'CSVプレビュー', to: '/tools/csv-viewer', desc: 'CSVを貼り付けてテーブル表示。' },
  { name: '日付差分チェッカー', to: '/tools/date-helper', desc: '2つの日付差分や日数加算を計算。' }
];
</script>
