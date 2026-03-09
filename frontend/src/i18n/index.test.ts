import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

async function loadI18nModule() {
  vi.resetModules()
  return import('./index')
}

describe('i18n locale setup', () => {
  beforeEach(() => {
    localStorage.clear()
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'en-US'
    })
  })

  afterEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  it('uses a supported locale from local storage during initialization', async () => {
    localStorage.setItem('app-locale', 'en')

    const { i18n } = await loadI18nModule()

    expect(i18n.global.locale.value).toBe('en')
  })

  it('falls back to the browser locale when no saved locale exists', async () => {
    const { i18n } = await loadI18nModule()

    expect(i18n.global.locale.value).toBe('en')
  })

  it('falls back to the default locale when the browser locale is unsupported', async () => {
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      value: 'de-DE'
    })

    const { i18n } = await loadI18nModule()

    expect(i18n.global.locale.value).toBe('hr')
  })

  it('setAppLocale updates both the active locale and local storage', async () => {
    const { i18n, setAppLocale } = await loadI18nModule()

    setAppLocale('en')

    expect(i18n.global.locale.value).toBe('en')
    expect(localStorage.getItem('app-locale')).toBe('en')
  })
})
