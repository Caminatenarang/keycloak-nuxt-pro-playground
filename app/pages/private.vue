<script setup lang="ts">
definePageMeta({ auth: true })

const { user, isAuthenticated, loading, login, logout, refresh, fetchSession } = useKeycloak()

onMounted(() => {
  fetchSession()
})

const handleRefresh = async () => {
  await refresh()
  await fetchSession()
}
</script>

<template>
  <section class="card">
    <p class="eyebrow">Rota protegida</p>
    <h2>Você está em /private</h2>
    <p class="muted">O middleware global confirmou a sessão antes de renderizar esta página.</p>

    <div class="status" :class="{ ok: isAuthenticated }">
      {{ isAuthenticated ? 'Autenticado' : 'Anônimo' }}
    </div>

    <div class="grid">
      <div>
        <p class="label">Username</p>
        <p class="value">{{ user?.preferred_username || '—' }}</p>
      </div>
      <div>
        <p class="label">Name</p>
        <p class="value">{{ user?.name || '—' }}</p>
      </div>
      <div>
        <p class="label">ID (sub)</p>
        <p class="value mono">{{ user?.sub || '—' }}</p>
      </div>
      <div>
        <p class="label">Email</p>
        <p class="value">{{ user?.email || '—' }}</p>
      </div>
    </div>

    <div class="actions">
      <button :disabled="loading" @click="handleRefresh">Refresh token</button>
      <NuxtLink class="secondary" to="/">Voltar ao início</NuxtLink>
      <button class="ghost" @click="logout({ redirect: '/' })">Logout</button>
    </div>

    <p class="muted small">
      Se quiser simular ausência de sessão, clique em Logout e volte aqui: o middleware redirecionará
      para <code>/api/auth/login?redirect=/private</code>.
    </p>
  </section>
</template>

<style scoped>
.card {
  width: min(840px, 100%);
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 20px 42px rgba(0, 0, 0, 0.25);
}

.eyebrow {
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 12px;
  color: #7dd3fc;
  margin-bottom: 6px;
}

h2 {
  margin: 0 0 6px;
}

.muted {
  color: #cbd5e1;
  margin: 0 0 12px;
}

.muted.small {
  font-size: 13px;
  margin-top: 14px;
}

.status {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 12px;
  background: rgba(239, 68, 68, 0.15);
  color: #fecdd3;
  font-weight: 700;
  margin-bottom: 14px;
}

.status.ok {
  background: rgba(74, 222, 128, 0.2);
  color: #bbf7d0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px 14px;
}

.label {
  color: #94a3b8;
  margin: 0 0 4px;
}

.value {
  margin: 0;
  font-size: 16px;
}

.mono {
  font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace;
  font-size: 13px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

button,
.secondary {
  border: none;
  outline: none;
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  color: #0f172a;
  background: linear-gradient(120deg, #22d3ee, #a5f3fc);
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  box-shadow: 0 8px 22px rgba(34, 211, 238, 0.35);
}

button:hover:not(:disabled),
.secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(34, 211, 238, 0.45);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.secondary {
  background: rgba(148, 163, 184, 0.12);
  color: #e2e8f0;
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: none;
}

.ghost {
  background: transparent;
  color: #e2e8f0;
  border: 1px dashed rgba(148, 163, 184, 0.4);
  box-shadow: none;
}

code {
  background: rgba(148, 163, 184, 0.12);
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 13px;
}
</style>
