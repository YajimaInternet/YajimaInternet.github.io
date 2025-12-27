<template>
  <section class="section">
    <div class="section-head">
      <h2>ブログ</h2>
      <span class="hint">Blog</span>
    </div>
    <div class="card">
      <p class="lede">
        YajimaInternetのブログなのだ
      </p>
      <div v-if="posts?.length">
        <div class="controls" style="margin-bottom: 16px;">
          <label class="stack" style="min-width: 240px;">
            検索
            <input v-model="search" class="input" placeholder="タイトル / 説明 / タグ">
          </label>
          <div class="stack">
            <span class="muted">タグ</span>
            <div class="chips">
              <button
                type="button"
                class="chip"
                :class="{ active: selectedTag === 'all' }"
                @click="selectedTag = 'all'"
              >
                すべて
              </button>
              <button
                v-for="tag in tagList"
                :key="tag.name"
                type="button"
                class="chip"
                :class="{ active: selectedTag === tag.name }"
                @click="selectedTag = tag.name"
              >
                {{ tag.name }} ({{ tag.count }})
              </button>
            </div>
          </div>
        </div>
        <div v-if="filteredPosts.length" class="grid cols-2">
          <article v-for="post in filteredPosts" :key="post.path" class="card">
            <NuxtLink :to="post.path">
              <h3>{{ post.title }}</h3>
            </NuxtLink>
            <p>{{ post.description }}</p>
            <div class="meta">
              <span class="pill">{{ formatDate(post.date) }}</span>
              <span v-if="post.readingTime" class="pill">{{ post.readingTime }} min read</span>
            </div>
            <div v-if="post.tags?.length" class="chips">
              <span v-for="tag in post.tags" :key="tag" class="chip">{{ tag }}</span>
            </div>
            <NuxtLink :to="post.path" class="btn btn-secondary" style="margin-top: 12px;">続きを読む</NuxtLink>
          </article>
        </div>
        <div v-else class="status" data-state="error">
          条件に一致する記事がありません。
        </div>
      </div>
      <div v-else class="status" data-state="error">
        まだ投稿がありません。
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'ブログ'
});

const { data: posts } = await useAsyncData('blog-index', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all()
);

const search = ref('');
const selectedTag = ref('all');

const tagList = computed(() => {
  const map = new Map<string, number>();
  (posts.value ?? []).forEach((post) => {
    (post.tags ?? []).forEach((tag: string) => {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    });
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'ja'));
});

const normalize = (value: string) => value.toLowerCase().trim();

const filteredPosts = computed(() => {
  const list = posts.value ?? [];
  const query = normalize(search.value);
  return list.filter((post) => {
    if (selectedTag.value !== 'all') {
      const tags = post.tags ?? [];
      if (!tags.includes(selectedTag.value)) return false;
    }
    if (!query) return true;
    const haystack = [
      post.title ?? '',
      post.description ?? '',
      ...(post.tags ?? [])
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(query);
  });
});

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
