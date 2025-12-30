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
  { name: '日付差分チェッカー', to: '/tools/date-helper', desc: '2つの日付差分や日数加算を計算。' },
  { name: 'JS難読化', to: '/tools/js-obfuscator', desc: 'Base64ラップで簡易難読化。' },
  { name: 'JSミニファイ', to: '/tools/js-minifier', desc: 'コメント削除と空白圧縮の簡易版。' },
  { name: 'CSSミニファイ', to: '/tools/css-minifier', desc: 'CSSのコメント削除と圧縮。' },
  { name: 'HTMLミニファイ', to: '/tools/html-minifier', desc: 'HTMLのコメント削除と空白整理。' },
  { name: 'ケース変換', to: '/tools/case-converter', desc: 'camel/snake/kebabなどに変換。' },
  { name: '行ツール', to: '/tools/line-sorter', desc: '行の並べ替え・重複除去・トリム。' },
  { name: 'Lorem生成', to: '/tools/lorem-ipsum', desc: 'ダミーテキストを手早く生成。' },
  { name: 'ハッシュ計算', to: '/tools/hash-generator', desc: 'SHA-1/256/384/512を生成。' },
  { name: 'JSON→CSV', to: '/tools/json-to-csv', desc: '配列JSONをCSVに変換。' },
  { name: '進数変換', to: '/tools/number-base', desc: '10進/16進/2進を相互変換。' },
  { name: 'UNIX時間', to: '/tools/unix-time', desc: 'エポック秒と日時の相互変換。' },
  { name: 'HTMLエンティティ', to: '/tools/html-entities', desc: 'エンコード/デコードを切り替え。' }
];
</script>
