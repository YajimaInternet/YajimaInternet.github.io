<template>
  <section class="section">
    <div class="section-head">
      <h2>Markdownプレビュー</h2>
      <span class="hint">軽量プレーンパーサ</span>
    </div>
    <div class="grid cols-2">
      <div class="card stack">
        <div class="controls">
          <button class="btn btn-secondary" type="button" @click="applySample">サンプルを挿入</button>
          <button class="btn btn-ghost" type="button" @click="clearAll">クリア</button>
        </div>
        <label class="stack">
          Markdown
          <textarea v-model="input" class="textarea" spellcheck="false"></textarea>
        </label>
      </div>
      <div class="card">
        <p class="muted" style="margin-top: 0;">プレビュー</p>
        <div class="post-body" v-html="html"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'Markdownプレビュー'
});

const sample = `# 簡易Markdown

## 見出し
- 箇条書き
- 箇条書き2

本文では **強調** や *斜体* も OK  
リンクは [YajimaInternet](https://example.com)

### コード
\`npm run dev\``;

const input = ref(sample);
const html = ref('');

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const sanitizeUrl = (raw: string) => {
  const trimmed = raw.trim();
  if (!trimmed) return '#';
  if (trimmed.startsWith('//')) return '#';
  if (
    trimmed.startsWith('#') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('../')
  ) {
    return trimmed;
  }
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) {
    return '#';
  }
  try {
    const url = new URL(trimmed);
    if (['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) {
      return url.href;
    }
  } catch {
    if (!/^[a-z][a-z0-9+.-]*:/.test(trimmed)) {
      return trimmed;
    }
  }
  return '#';
};

const inline = (text: string) => {
  let t = escapeHtml(text);
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/\*(.+?)\*/g, '<em>$1</em>');
  t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const safe = sanitizeUrl(href);
    return `<a href="${escapeHtml(safe)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });
  return t;
};

const render = () => {
  const lines = input.value.replace(/\r\n?/g, '\n').split('\n');
  let out = '';
  let inList = false;
  lines.forEach((line) => {
    if (/^-\s+/.test(line)) {
      if (!inList) { out += '<ul>'; inList = true; }
      out += `<li>${inline(line.replace(/^-\s+/, ''))}</li>`;
      return;
    }
    if (inList) { out += '</ul>'; inList = false; }
    if (!line.trim()) { out += '<p class="muted">&nbsp;</p>'; return; }
    if (line.startsWith('### ')) out += `<h3>${inline(line.slice(4))}</h3>`;
    else if (line.startsWith('## ')) out += `<h2>${inline(line.slice(3))}</h2>`;
    else if (line.startsWith('# ')) out += `<h1>${inline(line.slice(2))}</h1>`;
    else out += `<p>${inline(line)}</p>`;
  });
  if (inList) out += '</ul>';
  html.value = out || '<p class="muted">入力してください</p>';
};

const applySample = () => {
  input.value = sample;
  render();
};

const clearAll = () => {
  input.value = '';
  render();
};

watch(input, render, { immediate: true });
</script>
