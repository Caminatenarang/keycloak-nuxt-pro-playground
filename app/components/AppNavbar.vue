<script setup lang="ts">
const { isAuthenticated, loading, login, logout } = useKeycloak()
const route = useRoute()

const isClient = ref(false)
onMounted(() => {
  isClient.value = true
})

const runtimeContext = computed(() => (isClient.value ? 'Client' : 'SSR'))

const links = [
  { label: 'Home', to: '/' },
  { label: 'Sessão', to: '/session' },
  { label: 'Privado', to: '/private' }
]

const isActive = (path: string) => route.path === path

const handleLogin = () => login({ redirect: '/private' })
const handleLogout = () => logout({ redirect: '/' })
</script>

<template>
  <nav class="navbar">
    <div class="brand">Keycloak Nuxt Pro</div>

    <div class="links">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="link"
        :class="{ active: isActive(link.to) }"
      >
        {{ link.label }}
      </NuxtLink>
    </div>

    <div class="meta">
      <span class="badge" :class="{ ok: isAuthenticated }">
        {{ isAuthenticated ? 'Autenticado' : 'Não autenticado' }}
      </span>
      <span class="chip">Contexto: {{ runtimeContext }}</span>
      <button
        class="action"
        :disabled="loading"
        @click="isAuthenticated ? handleLogout() : handleLogin()"
      >
        {{ loading ? '...' : isAuthenticated ? 'Logout' : 'Login' }}
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 10px 18px;
  background: rgba(15, 15, 16, 0.78);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
}

.brand {
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #f8fafc;
}

.links {
  display: flex;
  gap: 10px;
  align-items: center;
}

.link {
  color: #e2e8f0;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 10px;
  transition: background 0.15s ease, color 0.15s ease;
}

.link:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #67e8f9;
}

.link.active {
  background: rgba(255, 255, 255, 0.08);
  color: #22d3ee;
}

.meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.badge {
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.14);
  color: #fecdd3;
  font-weight: 700;
  font-size: 13px;
}

.badge.ok {
  background: rgba(74, 222, 128, 0.16);
  color: #bbf7d0;
}

.chip {
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  color: #e2e8f0;
  font-weight: 700;
  font-size: 12px;
}

.action {
  border: none;
  outline: none;
  padding: 9px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 800;
  font-size: 14px;
  color: #0f172a;
  background: #fff;
  transition: transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
}

.action:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
}

.action:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  box-shadow: none;
}

@media (max-width: 780px) {
  .navbar {
    flex-wrap: wrap;
  }

  .meta {
    width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
}
</style>
