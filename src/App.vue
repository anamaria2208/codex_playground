<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <h1>Vue 3 Starter</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <main class="app-main">
    <RouterView />
  </main>
</template>

<style scoped>
.app-header {
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding: 1rem 0;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  color: #334155;
  font-weight: 500;
  text-decoration: none;
}

nav a.router-link-active {
  color: #2563eb;
}

.app-main {
  padding: 1.5rem 0;
}
</style>
