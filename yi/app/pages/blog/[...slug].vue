<template>
  <section class="section" v-if="post">
    <div class="section-head">
      <h2>{{ post.title }}</h2>
      <span class="hint">Blog</span>
    </div>
    <div class="card">
      <p v-if="post.description" class="lede">{{ post.description }}</p>
      <div class="meta">
        <span class="pill">{{ formatDate(post.date) }}</span>
        <span v-if="post.readingTime" class="pill">{{ post.readingTime }} min read</span>
      </div>
      <div v-if="post.tags?.length" class="chips">
        <span v-for="tag in post.tags" :key="tag" class="chip">{{ tag }}</span>
      </div>
      <div class="post-body">
      <ContentRenderer :value="safePost" />
      </div>
      <div class="section">
        <NuxtLink to="/blog" class="btn btn-secondary">一覧へ戻る</NuxtLink>
      </div>
    </div>
  </section>
  <section v-else class="section">
    <div class="card status" data-state="error">
      記事が見つかりませんでした。
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: post } = await useAsyncData(
  'blog-post',
  () => queryCollection('blog').path(route.path).first(),
  { watch: [() => route.path] }
);

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

const sanitizeContent = (value: unknown): any => {
  if (Array.isArray(value)) {
    return value.map(sanitizeContent).filter((item) => item !== null);
  }
  if (!value || typeof value !== 'object') {
    return value;
  }
  const node = value as Record<string, any>;
  const type = typeof node.type === 'string' ? node.type.toLowerCase() : '';
  const tag = typeof node.tag === 'string' ? node.tag.toLowerCase() : '';
  if (type === 'html' || type === 'raw' || tag === 'script' || tag === 'style' || tag === 'iframe') {
    return null;
  }
  const out: Record<string, any> = {};
  for (const [key, val] of Object.entries(node)) {
    if (key === 'props' || key === 'attrs') {
      const cleaned: Record<string, any> = {};
      if (val && typeof val === 'object') {
        for (const [p, v] of Object.entries(val)) {
          if (/^on/i.test(p) || p.toLowerCase() === 'srcdoc') continue;
          if ((p === 'href' || p === 'src') && typeof v === 'string') {
            cleaned[p] = sanitizeUrl(v);
          } else {
            cleaned[p] = v;
          }
        }
      }
      out[key] = cleaned;
      continue;
    }
    out[key] = sanitizeContent(val);
  }
  return out;
};

const safePost = computed(() => (post.value ? sanitizeContent(post.value) : null));

const pageTitle = computed(() => post.value?.title ?? 'ブログ');

useHead(() => ({
  title: pageTitle.value
}));

const formatDate = (value?: string) => {
  if (!value) return '日付未設定';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
</script>
