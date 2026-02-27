import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import CatFactsList from './components/CatFactsList.js'

createApp({
  components: { CatFactsList },
  template: `
    <main>
      <h1>Integracija na Cat Facts API</h1>
      <CatFactsList />
    </main>
  `
}).mount('#app')
