<template>
  <div class="app-shell" :class="{ dark: isDark, kawaii: isKawaii, rainbow: isRainbow }">
    <header class="site-header">
      <div class="container header-inner">
        <NuxtLink to="/" class="brand-link">
          <span class="brand-mark">
            <img src="/assets/logo.png" alt="YajimaInternet" class="brand-logo">
          </span>
          <span class="brand-title">
            <strong>YajimaInternet</strong>
            <small>より楽しく、より面白いを届ける</small>
          </span>
        </NuxtLink>
        <div class="header-actions">
          <nav class="site-nav" aria-label="グローバルナビゲーション">
            <template v-for="link in navLinks" :key="link.label">
              <NuxtLink
                v-if="!link.external"
                :to="link.to"
                class="nav-link"
                :class="{ active: isActive(link.to) }"
              >
                {{ link.label }}
              </NuxtLink>
              <a
                v-else
                :href="link.href"
                class="nav-link"
              >
                {{ link.label }}
              </a>
            </template>
          </nav>
          <button type="button" class="mode-toggle" @click="toggleMode">
            <span v-if="isDark">☾</span>
            <span v-else>☀</span>
          </button>
        </div>
      </div>
    </header>

    <main class="site-main">
      <div class="container">
        <slot />
      </div>
    </main>

    <footer class="site-footer">
      <div class="container footer-inner">
        <div>
          <p class="footer-title">YajimaInternet L.P.</p>
          <p class="footer-text">技術と創造性で日常をちょっと面白くする架空のチームです。</p>
        </div>
        <div class="footer-notice" v-if="notice && notice.title">
          <span class="badge">お知らせ</span>
          <NuxtLink v-if="notice && notice.to" :to="notice.to" class="footer-notice-link">
            {{ notice.title }}
          </NuxtLink>
          <span v-else class="footer-notice-text">{{ notice.title }}</span>
        </div>
        <div class="footer-social">
          <a class="social-btn" href="https://x.com/YajimaNetworks" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
            <img src="/assets/Logo_of_Twitter.svg" alt="X (Twitter)" width="20" height="20">
          </a>
          <a class="social-btn" href="https://instagram.com/yajimanetworks" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="/assets/insta.jpg" alt="Instagram" width="20" height="20">
          </a>
          <a class="social-btn" href="https://github.com/YajimaInternet/YajimaInternet.github.io/" target="_blank" rel="noopener noreferrer" aria-label="Source code on GitHub">
            <img src="/assets/github-mark.svg" alt="GitHub" width="20" height="20">
          </a>
        </div>
      </div>
      <p class="footer-copy">&copy; 2025 YajimaInternet L.P. All Rights Reserved. ※We are a fictitious organization.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const colorMode = useState<'light' | 'dark'>('color-mode', () => 'light');
const isDark = computed(() => colorMode.value === 'dark');
const isKawaii = computed(() => route.query.mode === 'kawaii');
const isRainbow = computed(() => route.query.mode === 'rainbow');
const appConfig = useAppConfig();
const notice = appConfig.notice as { title?: string; to?: string } | undefined;
const siteTitle = 'YajimaInternet';
const rainbowAudio = ref<HTMLAudioElement | null>(null);
const rainbowRetryTimer = ref<ReturnType<typeof setInterval> | null>(null);

useHead({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} | ${siteTitle}` : siteTitle)
});

const navLinks = [
  { label: 'ホーム', to: '/' },
  { label: 'ブログ', to: '/blog' },
  { label: '事業内容', to: '/about' },
  { label: '会社概要', to: '/company' },
  { label: 'お問い合わせ', to: '/contact' },
  { label: 'Tools', to: '/tools' }
];

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/';
  }
  return route.path.startsWith(path);
};

const applyMode = () => {
  const root = document.documentElement;
  if (colorMode.value === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

const applyKawaii = () => {
  const root = document.documentElement;
  if (isKawaii.value) {
    root.classList.add('kawaii');
  } else {
    root.classList.remove('kawaii');
  }
};

const applyRainbow = () => {
  const root = document.documentElement;
  if (isRainbow.value) {
    root.classList.add('rainbow');
  } else {
    root.classList.remove('rainbow');
  }
};

const syncRainbowAudio = async () => {
  const audio = rainbowAudio.value;
  if (!audio) {
    return;
  }
  if (isRainbow.value) {
    try {
      await audio.play();
    } catch {
      // Autoplay may be blocked; ignore and let user interaction retry.
    }
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
};

const handleUserGesture = () => {
  if (isRainbow.value) {
    syncRainbowAudio();
  }
};

onMounted(() => {
  const saved = localStorage.getItem('yn-color-mode');
  if (saved === 'dark' || saved === 'light') {
    colorMode.value = saved;
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    colorMode.value = 'dark';
  }
  applyMode();
  applyKawaii();
  applyRainbow();
  rainbowAudio.value = new Audio('/assets/u.m4a');
  rainbowAudio.value.loop = true;
  rainbowAudio.value.volume = 0.6;
  syncRainbowAudio();
  window.addEventListener('pointerdown', handleUserGesture, { passive: true });
  window.addEventListener('keydown', handleUserGesture);
  window.addEventListener('touchstart', handleUserGesture, { passive: true });
  window.addEventListener('scroll', handleUserGesture, { passive: true });
  window.addEventListener('focus', handleUserGesture);
  rainbowRetryTimer.value = setInterval(() => {
    const audio = rainbowAudio.value;
    if (!audio) {
      return;
    }
    if (isRainbow.value && audio.paused) {
      syncRainbowAudio();
    }
  }, 500);
});

watch(colorMode, (val) => {
  localStorage.setItem('yn-color-mode', val);
  applyMode();
});

watch(
  () => route.query.mode,
  () => {
    applyKawaii();
    applyRainbow();
    syncRainbowAudio();
  }
);

const toggleMode = () => {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark';
};

onBeforeUnmount(() => {
  if (rainbowAudio.value) {
    rainbowAudio.value.pause();
    rainbowAudio.value.currentTime = 0;
  }
  window.removeEventListener('pointerdown', handleUserGesture);
  window.removeEventListener('keydown', handleUserGesture);
  window.removeEventListener('touchstart', handleUserGesture);
  window.removeEventListener('scroll', handleUserGesture);
  window.removeEventListener('focus', handleUserGesture);
  if (rainbowRetryTimer.value) {
    clearInterval(rainbowRetryTimer.value);
    rainbowRetryTimer.value = null;
  }
});
</script>
