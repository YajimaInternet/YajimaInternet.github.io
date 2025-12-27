<template>
  <section class="section">
    <div class="section-head">
      <h2>お問い合わせ</h2>
      <span class="hint">Contact</span>
    </div>
    <div class="card">
      <p class="lede">
        以下のフォームにご記入のうえ送信してください。メールでも受け付けています:
        <a href="mailto:nanakyu@tsukuba.uk">nanakyu@tsukuba.uk</a>
      </p>
      <div class="iframe-wrap" style="margin-top: 12px;">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScplWst67UfA9p97h9wMiw5fvOfqQsZAkp0AX-o5fdTlcF-DA/viewform?embedded=true"
          allowfullscreen
        >
          読み込んでいます…
        </iframe>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: 'お問い合わせ'
});
</script>
