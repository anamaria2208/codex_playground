<script setup lang="ts">
import CatFactsList from '@/components/CatFactsList.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <section class="home">
    <header class="hero">
      <p class="eyebrow">{{ t('home.eyebrow') }}</p>
      <h2 class="title">{{ t('home.title') }}</h2>
      <p class="subtitle">{{ t('home.subtitle') }}</p>
    </header>
    <CatFactsList />
  </section>
</template>

<style scoped>
.home {
  display: grid;
  gap: 0.45rem;
  grid-template-columns: 1fr;
}

.hero {
  display: grid;
  gap: 0.2rem;
  padding: 0.1rem 0.1rem 0.15rem;
}

.eyebrow {
  color: #1d4ed8;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.title {
  color: #0f172a;
  font-size: clamp(1.25rem, 2vw, 1.65rem);
  line-height: 1.15;
}

.subtitle {
  color: #475569;
  font-size: 0.95rem;
  max-width: 58ch;
}
</style>
