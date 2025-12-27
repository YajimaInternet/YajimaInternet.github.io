<template>
  <section class="section">
    <div class="section-head">
      <h2>カラーピッカー</h2>
      <span class="hint">HEX / RGB / HSL と明るさ調整</span>
    </div>
    <div class="card stack">
      <div class="controls">
        <label class="stack" style="width: 180px;">
          ベースカラー
          <input v-model="hex" type="color" class="input" style="padding: 8px; height: 48px;">
        </label>
        <button class="btn btn-secondary" type="button" @click="randomize">ランダム</button>
        <button class="btn btn-ghost" type="button" @click="copyAll">全部コピー</button>
      </div>

      <label class="stack">
        明るさ調整: {{ delta }}
        <input v-model.number="delta" type="range" min="-50" max="50" class="input" @input="update">
      </label>

      <div class="grid-2" style="align-items: center;">
        <div class="card" style="margin: 0; box-shadow: none;">
          <p class="muted">ベース</p>
          <div :style="{ background: hex, height: '80px', borderRadius: '12px', border: '1px solid var(--border)' }"></div>
          <p class="lede">{{ hex }}</p>
          <p class="muted">{{ rgbText }}</p>
          <p class="muted">{{ hslText }}</p>
          <div class="controls">
            <button class="btn btn-ghost" type="button" data-copy="hex" @click="copy(hex)">HEX</button>
            <button class="btn btn-ghost" type="button" data-copy="rgb" @click="copy(rgbText)">RGB</button>
            <button class="btn btn-ghost" type="button" data-copy="hsl" @click="copy(hslText)">HSL</button>
          </div>
        </div>

        <div class="card" style="margin: 0; box-shadow: none;">
          <p class="muted">調整後 ({{ delta >= 0 ? '+' : '' }}{{ delta }})</p>
          <div :style="{ background: tintedHex, height: '80px', borderRadius: '12px', border: '1px solid var(--border)' }"></div>
          <p class="lede">{{ tintedHex }}</p>
          <div class="controls">
            <button class="btn btn-secondary" type="button" @click="copy(tintedHex)">コピー</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'カラーピッカー'
});

const hex = ref('#2563EB');
const delta = ref(0);
const tintedHex = ref('#2563EB');
const rgbText = ref('');
const hslText = ref('');

const clamp = (n: number, min = 0, max = 100) => Math.min(max, Math.max(min, n));

const hexToRgb = (value: string) => {
  const v = value.replace('#', '');
  if (v.length !== 6) return { r: 0, g: 0, b: 0 };
  const int = parseInt(v, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
};

const rgbToHsl = ({ r, g, b }: { r: number; g: number; b: number }) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0; let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const hslToHex = ({ h, s, l }: { h: number; s: number; l: number }) => {
  const C = (1 - Math.abs(2 * (l / 100) - 1)) * (s / 100);
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l / 100 - C / 2;
  let r = 0; let g = 0; let b = 0;
  if (h < 60) { r = C; g = X; }
  else if (h < 120) { r = X; g = C; }
  else if (h < 180) { g = C; b = X; }
  else if (h < 240) { g = X; b = C; }
  else if (h < 300) { r = X; b = C; }
  else { r = C; b = X; }
  const to255 = (v: number) => Math.round((v + m) * 255);
  const hexValue = [to255(r), to255(g), to255(b)].map((v) => v.toString(16).padStart(2, '0')).join('');
  return `#${hexValue}`.toUpperCase();
};

const update = () => {
  const rgb = hexToRgb(hex.value);
  const hsl = rgbToHsl(rgb);
  const tinted = { ...hsl, l: clamp(hsl.l + delta.value) };
  tintedHex.value = hslToHex(tinted);
  rgbText.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  hslText.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
};

const randomize = () => {
  const randomHex = `#${crypto.getRandomValues(new Uint8Array(3))
    .reduce((s, n) => s + n.toString(16).padStart(2, '0'), '')
    .toUpperCase()}`;
  hex.value = randomHex;
  delta.value = 0;
  update();
};

const copy = (text: string) => {
  navigator.clipboard?.writeText(text || '');
};

const copyAll = () => {
  const lines = [`HEX: ${hex.value}`, `RGB: ${rgbText.value}`, `HSL: ${hslText.value}`, `調整後: ${tintedHex.value}`];
  navigator.clipboard?.writeText(lines.join('\n'));
};

watch([hex, delta], update, { immediate: true });
</script>
