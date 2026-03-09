<script setup lang="ts">
import CatFactsList from '@/components/CatFactsList.vue'
</script>

<template>
  <section class="home">
    <CatFactsList />
  </section>
</template>

<style scoped>
.home {
  display: grid;
  gap: 0.45rem;
  grid-template-columns: 1fr;
}
</style>
