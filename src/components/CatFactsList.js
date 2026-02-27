import { ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { fetchCatFacts } from '../services/catFactsApi.js'

export default {
  name: 'CatFactsList',
  setup() {
    const facts = ref([])
    const loading = ref(false)
    const error = ref('')

    const loadFacts = async () => {
      loading.value = true
      error.value = ''

      try {
        facts.value = await fetchCatFacts()
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Došlo je do neočekivane greške.'
      } finally {
        loading.value = false
      }
    }

    onMounted(loadFacts)

    return { facts, loading, error, loadFacts }
  },
  template: `
    <section class="cat-facts">
      <h2>🐱 Cat Facts</h2>

      <button type="button" class="refresh-button" @click="loadFacts" :disabled="loading">
        {{ loading ? 'Učitavanje...' : 'Osvježi činjenice' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-else-if="loading">Dohvaćam najzanimljivije mačje činjenice...</p>

      <ul v-else class="facts-list">
        <li v-for="fact in facts" :key="fact._id">
          {{ fact.text }}
        </li>
      </ul>
    </section>
  `
}

const style = document.createElement('style')
style.textContent = `
.cat-facts {
  max-width: 760px;
  margin: 2rem auto;
  padding: 1.25rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: white;
}

.refresh-button {
  margin-bottom: 1rem;
  padding: 0.55rem 0.85rem;
  border: none;
  border-radius: 8px;
  background: #2c7be5;
  color: white;
  cursor: pointer;
}

.refresh-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #b00020;
}

.facts-list {
  padding-left: 1.1rem;
}

.facts-list li + li {
  margin-top: 0.6rem;
}
`
document.head.appendChild(style)
