<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

<template>
  <section>
    <h2>Modern Vue 3 Setup</h2>
    <p>
      Ovaj projekat koristi Vue 3 + TypeScript + Vite + Pinia + Vue Router kao moderni frontend
      baseline.
    </p>

    <button type="button" @click="counterStore.increment">Count is {{ counterStore.count }}</button>
    <p>Double count: {{ counterStore.doubleCount }}</p>
  </section>
</template>

<style scoped>
section {
  display: grid;
  gap: 0.75rem;
}

button {
  background: #2563eb;
  border: 0;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  max-width: 13rem;
  padding: 0.625rem 1rem;
}
</style>
