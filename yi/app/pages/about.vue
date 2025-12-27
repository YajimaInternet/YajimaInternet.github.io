<template>
  <section class="section">
    <div class="section-head">
      <h2>事業内容</h2>
      <span class="hint">Business</span>
    </div>
    <div class="card">
      <div class="grid cols-2" style="align-items: center;">
        <div class="card" style="margin: 0; box-shadow: none;">
          <p class="lede">
            Webサービスの企画・開発・運営、ITコンサルティング、デジタルコンテンツ制作を中心に展開しています。最新技術を活用し、ユーザーの創造力を刺激するサービスを提供します。
          </p>
          <NuxtLink to="/contact" class="btn btn-primary" style="margin-top: 12px;">お問い合わせはこちら</NuxtLink>
        </div>
        <div class="card" style="margin: 0; box-shadow: none; text-align: center;">
          <img src="/assets/photo-1519389950473-47ba0277781c.avif" alt="テクノロジーとアイデア" style="width: 100%; border-radius: 12px; object-fit: cover;">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: '事業内容'
});
</script>
