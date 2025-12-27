<template>
  <section class="hero">
    <label>YajimaInternet合資会社</label>
    <h1>より楽しく、より面白くをモットーに</h1>
    <p>
      技術と創造性で日々の暮らしをもっと楽しく面白くすることを目指しています。事業内容は「事業内容」ページへ、会社概要は「会社概要」ページへどうぞ。
    </p>
    <div class="hero-actions">
      <NuxtLink to="/about" class="btn btn-secondary">事業内容を見る</NuxtLink>
      <NuxtLink to="/company" class="btn btn-secondary">会社概要を見る</NuxtLink>
      <NuxtLink to="/contact" class="btn btn-primary">お問い合わせ</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'ホーム'
});
</script>
