<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SelectButton from 'primevue/selectbutton'
import { setAppLocale, type AppLocale } from '@/i18n'

type AppTheme = 'light' | 'dark'
const THEME_STORAGE_KEY = 'app-theme'

const { locale, t } = useI18n({ useScope: 'global' })

const localeOptions: { label: string; value: AppLocale }[] = [
  { label: 'HR', value: 'hr' },
  { label: 'EN', value: 'en' }
]

const theme = ref<AppTheme>('light')

const themeOptions = computed(() => [
  { label: '☀️', value: 'light' as AppTheme },
  { label: '🌙', value: 'dark' as AppTheme }
])

const applyTheme = (value: AppTheme) => {
  theme.value = value
  document.documentElement.classList.toggle('dark-theme', value === 'dark')
  localStorage.setItem(THEME_STORAGE_KEY, value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'light' || savedTheme === 'dark') {
    applyTheme(savedTheme)
    return
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(prefersDark ? 'dark' : 'light')
})

const selectedLocale = computed({
  get: () => locale.value as AppLocale,
  set: (value: AppLocale) => setAppLocale(value)
})
</script>

<template>
  <main class="app-shell">
    <header class="app-header">
      <h1>{{ t('app.title') }}</h1>
      <div class="controls">
        <div class="control-group">
          <SelectButton
            v-model="selectedLocale"
            :options="localeOptions"
            optionLabel="label"
            optionValue="value"
            aria-label="Language switcher"
          />
        </div>
        <div class="control-group">
          <SelectButton
            v-model="theme"
            :options="themeOptions"
            optionLabel="label"
            optionValue="value"
            aria-label="Theme switcher"
            @update:model-value="applyTheme"
          />
        </div>
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
  background: var(--header-bg);
  border: 1px solid var(--header-border);
  border-radius: 0.8rem;
  box-shadow: 0 10px 35px var(--header-shadow);
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

.controls {
  align-items: center;
  display: flex;
  gap: 0.8rem;
}

.control-group {
  align-items: center;
  display: flex;
  gap: 0.6rem;
}

.control-group span {
  color: var(--text-secondary);
  font-size: 0.82rem;
  font-weight: 600;
}

@media (max-width: 700px) {
  .app-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.8rem;
  }

  .controls {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
