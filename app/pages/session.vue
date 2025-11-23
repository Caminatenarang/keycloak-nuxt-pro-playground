<script setup lang="ts">
type SessionResponse = {
  isAuthenticated: boolean
  user?: Record<string, unknown>
  expires_in?: number
  token_type?: string
  scope?: string
}

const { refresh: refreshTokens } = useKeycloak()

const {
  data: session,
  pending,
  error,
  refresh
} = await useAsyncData<SessionResponse>('kc-session', () =>
  $fetch('/api/auth/session')
)

const reloadSession = () => refresh()

const refreshAndReload = async () => {
  await refreshTokens().catch(() => {})
  await refresh()
}

const sessionJson = computed(() =>
  session.value ? JSON.stringify(session.value, null, 2) : 'null'
)
</script>

<template>
  <section class="card">
    <p class="eyebrow">Sessão atual</p>
    <h2>GET /api/auth/session</h2>
    <p class="muted">Veja o payload retornado pelos endpoints HttpOnly.</p>

    <div class="actions">
      <button :disabled="pending" @click="reloadSession">
        {{ pending ? 'Atualizando...' : 'Recarregar sessão' }}
      </button>
      <button class="secondary" :disabled="pending" @click="refreshAndReload">
        Refresh token + recarregar
      </button>
      <NuxtLink class="ghost" to="/">Voltar</NuxtLink>
    </div>

    <div v-if="error" class="error">Erro: {{ error?.message }}</div>
    <div v-else-if="pending" class="loading">Carregando...</div>
    <div v-else class="json">
      <pre>{{ sessionJson }}</pre>
    </div>
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

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
  margin-bottom: 12px;
}

button,
.secondary,
.ghost {
  border: none;
  outline: none;
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

button {
  color: #0f172a;
  background: linear-gradient(120deg, #22d3ee, #a5f3fc);
  box-shadow: 0 8px 22px rgba(34, 211, 238, 0.35);
}

button:hover:not(:disabled) {
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
}

.ghost {
  background: transparent;
  color: #e2e8f0;
  border: 1px dashed rgba(148, 163, 184, 0.4);
}

.loading,
.error {
  padding: 10px 12px;
  border-radius: 12px;
}

.loading {
  background: rgba(148, 163, 184, 0.12);
}

.error {
  background: rgba(239, 68, 68, 0.12);
  color: #fecdd3;
}

.json {
  margin-top: 10px;
}

pre {
  margin: 0;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 12px;
  padding: 14px;
  color: #e2e8f0;
  font-size: 13px;
  overflow: auto;
}
</style>
