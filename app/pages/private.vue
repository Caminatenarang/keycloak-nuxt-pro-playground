<script setup lang="ts">
definePageMeta({ auth: true })

const { user, isAuthenticated, loading, logout, fetchSession } = useKeycloak()

const session = ref<Record<string, unknown> | null>(null)

const loadSession = async () => {
  const data = await fetchSession()
  session.value = data
}

onMounted(() => {
  loadSession()
})

const sessionJson = computed(() => session.value ? JSON.stringify(session.value, null, 2) : '—')

const handleLogout = async () => {
  await logout({ redirect: '/' })
}
</script>

<template>
  <div class="page">
    <div class="glow glow-a" />
    <div class="glow glow-b" />

    <section class="card hero">
      <div class="meta">
        <span class="pill">Rota protegida</span>
        <span class="pill subtle">SSR + middleware</span>
      </div>
      <h1>Bem-vindo, {{ user?.preferred_username }}</h1>
      <p class="lede">
        Esta página só renderiza com sessão válida em SSR. Use os botões para atualizar o estado ou
        sair.
      </p>
      <div class="status-row">
        <span class="status" :class="{ ok: isAuthenticated }">
          {{ isAuthenticated ? 'Autenticado' : 'Anônimo' }}
        </span>
        <NuxtLink class="link" to="/">Voltar ao início →</NuxtLink>
      </div>
      <div class="actions">
        <button :disabled="loading" @click="loadSession">
          {{ loading ? 'A atualizar...' : 'Atualizar sessão' }}
        </button>
        <button class="ghost" :disabled="loading" @click="handleLogout">
          {{ loading ? 'Saindo...' : 'Logout' }}
        </button>
      </div>
    </section>

    <section class="card">
      <header class="section-head">
        <div>
          <p class="eyebrow">Sessão SSR</p>
          <h2>Payload atual</h2>
        </div>
        <p class="hint">Retorno de /api/auth/session</p>
      </header>
      <pre>{{ sessionJson }}</pre>
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
  opacity: 0.5;
}

.glow-a {
  background: radial-gradient(circle at 12% 10%, rgba(56, 189, 248, 0.2), transparent 32%);
}

.glow-b {
  background: radial-gradient(circle at 80% 0%, rgba(94, 234, 212, 0.2), transparent 30%);
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
  margin: 0 0 12px;
  color: #cbd5e1;
  font-size: 17px;
  max-width: 720px;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 12px;
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

.link {
  color: #67e8f9;
  text-decoration: none;
  font-weight: 700;
}

.link:hover {
  text-decoration: underline;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

button,
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

.ghost {
  color: #e2e8f0;
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.26);
}

.ghost:hover {
  border-color: rgba(94, 234, 212, 0.55);
  color: #67e8f9;
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
  .ghost {
    width: 100%;
    text-align: center;
  }
}
</style>
