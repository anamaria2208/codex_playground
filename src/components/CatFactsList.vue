<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchCatFact } from '@/services/catFactsApi'

const fact = ref('')
const loading = ref(false)
const error = ref('')

const loadFacts = async () => {
  loading.value = true
  error.value = ''

  try {
    const currentFact = fact.value
    let nextFact = await fetchCatFact()

    for (let i = 0; i < 3 && nextFact === currentFact; i += 1) {
      nextFact = await fetchCatFact()
    }

    fact.value = nextFact
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Doslo je do neocekivane greske.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void loadFacts()
})
</script>

<template>
  <section class="cat-facts">
    <h2>Cat Facts</h2>

    <button type="button" class="refresh-button" @click="loadFacts" :disabled="loading">
      {{ loading ? 'Ucitavanje...' : 'Osvjezi cinjenice' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-else-if="loading">Dohvacam najzanimljiviju macju cinjenicu...</p>
    <p v-else class="fact-text">{{ fact }}</p>
  </section>
</template>

<style scoped>
.cat-facts {
  max-width: 760px;
  margin: 2rem auto;
  padding: 1.25rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
}

.refresh-button {
  margin-bottom: 1rem;
  padding: 0.55rem 0.85rem;
  border: none;
  border-radius: 8px;
  background: #2c7be5;
  color: #fff;
  cursor: pointer;
}

.refresh-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #b00020;
}

.fact-text {
  line-height: 1.5;
}
</style>
