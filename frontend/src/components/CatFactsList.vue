<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { CAT_FACT_FETCH_ERROR, fetchCatFact } from '@/services/catFactsApi'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'

const { t } = useI18n({ useScope: 'global' })
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
    if (err instanceof Error && err.message === CAT_FACT_FETCH_ERROR) {
      error.value = t('catFact.errorFetch')
    } else {
      error.value = t('common.unexpectedError')
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void loadFacts()
})
</script>

<template>
  <Card class="cat-card">
    <template #title>{{ t('catFact.cardTitle') }}</template>
    <template #subtitle>{{ t('catFact.cardSubtitle') }}</template>
    <template #content>
      <div class="content">
        <Button
          class="refresh-button"
          :disabled="loading"
          :loading="loading"
          icon="pi pi-refresh"
          :label="t('catFact.refresh')"
          @click="loadFacts"
        />

        <Message v-if="error" severity="error" :closable="false">{{ error }}</Message>

        <div v-else-if="loading" class="loading">
          <ProgressSpinner style="width: 42px; height: 42px" strokeWidth="6" />
          <p>{{ t('catFact.loading') }}</p>
        </div>

        <p v-else class="fact-text">{{ fact }}</p>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.cat-card {
  border-radius: 0.8rem;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
}

.cat-card :deep(.p-card) {
  background: var(--card-surface) !important;
  border: 1px solid var(--fact-border);
}

.cat-card :deep(.p-card-body) {
  gap: 0.45rem;
  padding: 0.8rem;
}

.cat-card :deep(.p-card-title) {
  color: var(--card-title) !important;
  font-size: 1.2rem;
  font-weight: 800;
}

.cat-card :deep(.p-card-subtitle) {
  color: var(--text-muted) !important;
  font-size: 0.9rem;
}

.cat-card :deep(.p-card-content) {
  padding: 0;
}

.content {
  display: grid;
  gap: 0.55rem;
}

.refresh-button {
  justify-self: center;
  min-width: 11.5rem;
}

.refresh-button :deep(.p-button) {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border: 0;
  border-radius: 999px;
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.28);
  font-weight: 700;
  letter-spacing: 0.01em;
  padding: 0.58rem 1.2rem;
  transition: transform 0.16s ease, box-shadow 0.16s ease, filter 0.16s ease;
}

.refresh-button :deep(.p-button:not(:disabled):hover) {
  box-shadow: 0 14px 28px rgba(37, 99, 235, 0.4);
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.refresh-button :deep(.p-button:disabled) {
  opacity: 0.8;
}

.loading {
  align-items: center;
  color: var(--text-secondary);
  display: flex;
  gap: 0.55rem;
  font-size: 0.92rem;
}

.fact-text {
  background: linear-gradient(180deg, var(--fact-bg-start) 0%, var(--fact-bg-end) 100%);
  border: 1px solid var(--fact-border);
  border-left: 4px solid var(--fact-border-accent);
  border-radius: 0.65rem;
  color: var(--card-title);
  font-size: 0.96rem;
  line-height: 1.4;
  padding: 0.65rem 0.75rem;
}

@media (max-width: 600px) {
  .refresh-button {
    width: 100%;
  }

  .refresh-button :deep(.p-button) {
    width: 100%;
  }
}

</style>
