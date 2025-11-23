<template>
  <div class="app-shell">
    <NuxtRouteAnnouncer />
    <header class="app-header">
      <h1>Keycloak + Nuxt Playground</h1>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/private">Private</NuxtLink>
        <NuxtLink to="/session">Session</NuxtLink>
      </nav>
    </header>
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

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.15);
  background: radial-gradient(circle at 10% 20%, rgba(56, 189, 248, 0.15), transparent 25%),
    radial-gradient(circle at 90% 0%, rgba(94, 234, 212, 0.12), transparent 20%);
}

nav {
  display: flex;
  gap: 12px;
}

nav a {
  color: #e2e8f0;
  text-decoration: none;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background 0.2s ease, color 0.2s ease;
}

nav a:hover {
  background: rgba(148, 163, 184, 0.15);
  color: #67e8f9;
}

.app-main {
  flex: 1;
  padding: 24px 20px 40px;
  display: flex;
  justify-content: center;
}

@media (max-width: 640px) {
  .app-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  nav {
    flex-wrap: wrap;
  }
}
</style>
