import { createI18n } from 'vue-i18n'
import { messages, type AppLocale } from './messages'
export type { AppLocale } from './messages'

const STORAGE_KEY = 'app-locale'
const DEFAULT_LOCALE: AppLocale = 'hr'

function isSupportedLocale(locale: string): locale is AppLocale {
  return locale in messages
}

function detectInitialLocale(): AppLocale {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && isSupportedLocale(stored)) {
    return stored
  }

  const browserLocale = window.navigator.language.toLowerCase().slice(0, 2)
  if (isSupportedLocale(browserLocale)) {
    return browserLocale
  }

  return DEFAULT_LOCALE
}

export const i18n = createI18n({
  legacy: false,
  locale: detectInitialLocale(),
  fallbackLocale: 'en',
  messages
})

export function setAppLocale(locale: AppLocale) {
  i18n.global.locale.value = locale
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, locale)
  }
}
