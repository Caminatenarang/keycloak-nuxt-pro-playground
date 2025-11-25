<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />
    <AppNavbar />
    <main class="app-main">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0f172a;
  color: #e2e8f0;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.app-main {
  flex: 1;
  padding: 92px 20px 40px;
  display: flex;
  justify-content: center;
}
</style>
