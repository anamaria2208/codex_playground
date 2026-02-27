export const messages = {
  en: {
    app: {
      title: 'Cat Facts',
      language: 'Language'
    },
    home: {
      eyebrow: 'PrimeVue Demo',
      title: 'Random Cat Fact',
      subtitle: 'Click the button to fetch a new random fact.'
    },
    catFact: {
      cardTitle: 'Cat Fact',
      cardSubtitle: 'Each click returns one random fact.',
      refresh: 'Refresh fact',
      loading: 'Fetching a random cat fact...',
      errorFetch: 'Unable to fetch cat facts at the moment.'
    },
    common: {
      unexpectedError: 'An unexpected error occurred.'
    }
  },
  hr: {
    app: {
      title: 'Cat Cinjenice',
      language: 'Jezik'
    },
    home: {
      eyebrow: 'PrimeVue Demo',
      title: 'Nasumicna Cat Cinjenica',
      subtitle: 'Klikni gumb i dohvatit cemo novu nasumicnu cinjenicu.'
    },
    catFact: {
      cardTitle: 'Cat Cinjenica',
      cardSubtitle: 'Svaki klik vraca novu random cinjenicu.',
      refresh: 'Osvjezi cinjenicu',
      loading: 'Dohvacam najzanimljiviju macju cinjenicu...',
      errorFetch: 'Trenutno nije moguce dohvatiti cat cinjenice.'
    },
    common: {
      unexpectedError: 'Doslo je do neocekivane greske.'
    }
  }
} as const

export type AppLocale = keyof typeof messages
