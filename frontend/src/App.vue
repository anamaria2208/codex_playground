<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SelectButton from 'primevue/selectbutton'
import { setAppLocale, type AppLocale } from '@/i18n'

const { locale, t } = useI18n({ useScope: 'global' })

const localeOptions: { label: string; value: AppLocale }[] = [
  { label: 'HR', value: 'hr' },
  { label: 'EN', value: 'en' }
]

const selectedLocale = computed({
  get: () => locale.value as AppLocale,
  set: (value: AppLocale) => setAppLocale(value)
})
</script>

<template>
  <main class="app-shell">
    <header class="app-header">
      <h1>{{ t('app.title') }}</h1>
      <div class="locale-switcher">
        <span>{{ t('app.language') }}</span>
        <SelectButton
          v-model="selectedLocale"
          :options="localeOptions"
          optionLabel="label"
          optionValue="value"
          aria-label="Language switcher"
        />
      </div>
    </header>

    <RouterView />
  </main>
</template>

<style scoped>
.app-shell {
  display: grid;
  gap: 0.45rem;
  margin: 0 auto;
  max-width: 940px;
  padding: 0.6rem 0.9rem 0.9rem;
}

.app-header {
  align-items: center;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 0.8rem;
  box-shadow: 0 10px 35px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: space-between;
  padding: 0.45rem 0.65rem 0.45rem 0.75rem;
  width: 100%;
}

h1 {
  font-size: clamp(1rem, 1.8vw, 1.25rem);
  letter-spacing: 0.01em;
}

.locale-switcher {
  align-items: center;
  display: flex;
  gap: 0.6rem;
}

.locale-switcher span {
  color: #334155;
  font-size: 0.82rem;
  font-weight: 600;
}

@media (max-width: 700px) {
  .app-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>
