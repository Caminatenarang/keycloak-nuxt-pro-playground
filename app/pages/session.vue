<script setup lang="ts">
const { isAuthenticated, user, loading, login, logout, fetchSession } = useKeycloak()

const sessionData = ref<Record<string, unknown> | null>(null)
const error = ref<string | null>(null)

const loadSession = async () => {
  error.value = null
  try {
    sessionData.value = await fetchSession()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erro ao carregar sessão'
  }
}

await loadSession()

onMounted(() => {
  loadSession()
})

const userJson = computed(() => (user.value ? JSON.stringify(user.value, null, 2) : 'null'))

const tokensInfo = computed(() => {
  if (!sessionData.value || typeof sessionData.value !== 'object') return null
  return {
    expires_in: (sessionData.value as any).expires_in ?? '—',
    refresh_expires_in: (sessionData.value as any).refresh_expires_in ?? '—',
    token_type: (sessionData.value as any).token_type ?? '—',
    scope: (sessionData.value as any).scope ?? '—'
  }
})

const handleLogin = () => login({ redirect: '/private' })
const handleLogout = () => logout({ redirect: '/' })
</script>

<template>
  <div class="page">
    <div class="glow glow-a" />
    <div class="glow glow-b" />

    <section class="card hero">
      <div class="meta">
        <span class="pill">useKeycloak()</span>
        <span class="pill subtle">SSR + HttpOnly</span>
      </div>
      <h1>Sessão em SSR</h1>
      <p class="lede">
        Valores carregados com <code>useKeycloak()</code> no servidor e no cliente.
      </p>

      <div class="status-row">
        <span class="status" :class="{ ok: isAuthenticated }">
          {{ isAuthenticated ? 'Autenticado' : 'Anônimo' }}
        </span>
        <span class="chip">Loading: {{ loading ? 'Sim' : 'Não' }}</span>
      </div>

      <div class="actions">
        <button :disabled="loading" @click="handleLogin">
          {{ loading ? 'Aguarde...' : 'Login' }}
        </button>
        <button class="ghost" :disabled="loading" @click="handleLogout">
          {{ loading ? 'Aguarde...' : 'Logout' }}
        </button>
        <button class="secondary" :disabled="loading" @click="loadSession">
          {{ loading ? 'Carregando...' : 'Atualizar sessão' }}
        </button>
      </div>

      <div class="mini-grid">
        <div class="mini-card">
          <p class="label">isAuthenticated</p>
          <p class="value">{{ isAuthenticated ? 'true' : 'false' }}</p>
        </div>
        <div class="mini-card">
          <p class="label">expires_in</p>
          <p class="value">{{ tokensInfo?.expires_in ?? '—' }}</p>
        </div>
        <div class="mini-card">
          <p class="label">refresh_expires_in</p>
          <p class="value">{{ tokensInfo?.refresh_expires_in ?? '—' }}</p>
        </div>
        <div class="mini-card">
          <p class="label">token_type</p>
          <p class="value">{{ tokensInfo?.token_type ?? '—' }}</p>
        </div>
        <div class="mini-card">
          <p class="label">scope</p>
          <p class="value">{{ tokensInfo?.scope ?? '—' }}</p>
        </div>
      </div>
    </section>

    <section class="card">
      <header class="section-head">
        <div>
          <p class="eyebrow">User</p>
          <h2>JSON formatado</h2>
        </div>
        <p class="hint">Dados preenchidos em SSR</p>
      </header>
      <div v-if="error" class="alert error">Erro: {{ error }}</div>
      <div v-else-if="loading && !sessionData" class="alert">Carregando...</div>
      <pre>{{ userJson }}</pre>
    </section>

    <section class="card">
      <header class="section-head">
        <div>
          <p class="eyebrow">Sessão</p>
          <h2>Payload completo</h2>
        </div>
        <p class="hint">/api/auth/session</p>
      </header>
      <div v-if="error" class="alert error">Erro: {{ error }}</div>
      <div v-else-if="loading && !sessionData" class="alert">Carregando...</div>
      <pre>{{ sessionData ? JSON.stringify(sessionData, null, 2) : 'null' }}</pre>
    </section>
  </div>
</template>

<style scoped>
.page {
  position: relative;
  width: min(960px, 100%);
  display: grid;
  gap: 16px;
}

.glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  filter: blur(120px);
  opacity: 0.6;
}

.glow-a {
  background: radial-gradient(circle at 20% 10%, rgba(56, 189, 248, 0.2), transparent 32%);
}

.glow-b {
  background: radial-gradient(circle at 80% 0%, rgba(94, 234, 212, 0.18), transparent 30%);
}

.card {
  position: relative;
  background: rgba(15, 23, 42, 0.78);
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 18px;
  padding: 20px;
  box-shadow: 0 20px 42px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
}

.hero {
  border: 1px solid rgba(56, 189, 248, 0.25);
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(94, 234, 212, 0.06)),
    rgba(15, 23, 42, 0.85);
}

.meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.pill {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.16);
  border: 1px solid rgba(56, 189, 248, 0.35);
  color: #e0f2fe;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.pill.subtle {
  background: rgba(148, 163, 184, 0.12);
  border-color: rgba(148, 163, 184, 0.28);
}

h1 {
  margin: 6px 0 6px;
  font-size: clamp(28px, 4vw, 38px);
  color: #f8fafc;
  letter-spacing: -0.02em;
}

.lede {
  margin: 0 0 10px;
  color: #cbd5e1;
  font-size: 17px;
  max-width: 720px;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  border-radius: 12px;
  background: rgba(248, 113, 113, 0.18);
  color: #fecdd3;
  font-weight: 800;
}

.status.ok {
  background: rgba(74, 222, 128, 0.2);
  color: #bbf7d0;
}

.chip {
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(148, 163, 184, 0.12);
  color: #e2e8f0;
  font-weight: 700;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

button,
.secondary,
.ghost {
  border: none;
  outline: none;
  padding: 11px 14px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 800;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease, border-color 0.2s ease;
}

button {
  color: #0f172a;
  background: linear-gradient(120deg, #22d3ee, #a5f3fc);
  box-shadow: 0 10px 26px rgba(34, 211, 238, 0.35);
}

button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  box-shadow: none;
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(34, 211, 238, 0.45);
}

.secondary {
  background: rgba(148, 163, 184, 0.12);
  color: #e2e8f0;
  border: 1px solid rgba(148, 163, 184, 0.26);
}

.ghost {
  background: transparent;
  color: #e2e8f0;
  border: 1px dashed rgba(148, 163, 184, 0.4);
}

.ghost:hover,
.secondary:hover {
  border-color: rgba(94, 234, 212, 0.55);
  color: #67e8f9;
}

.mini-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
}

.mini-card {
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.label {
  color: #94a3b8;
  font-size: 13px;
  margin: 0 0 6px;
}

.value {
  margin: 0;
  color: #e2e8f0;
  font-weight: 700;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.eyebrow {
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 12px;
  color: #7dd3fc;
  margin: 0 0 6px;
}

h2 {
  margin: 0;
  font-size: 22px;
  color: #f8fafc;
}

.hint {
  margin: 0;
  color: #94a3b8;
}

.alert {
  margin: 0 0 8px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(148, 163, 184, 0.12);
  color: #e2e8f0;
}

.alert.error {
  background: rgba(239, 68, 68, 0.12);
  color: #fecdd3;
}

pre {
  margin: 0;
  background: rgba(15, 23, 42, 0.8);
  border: 1px dashed rgba(148, 163, 184, 0.35);
  border-radius: 12px;
  padding: 12px;
  color: #e2e8f0;
  font-size: 13px;
  overflow: auto;
}

@media (max-width: 720px) {
  .actions {
    flex-direction: column;
    align-items: stretch;
  }

  button,
  .secondary,
  .ghost {
    width: 100%;
    text-align: center;
  }
}
</style>
