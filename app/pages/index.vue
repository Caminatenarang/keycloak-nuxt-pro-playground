<script setup lang="ts">
const { isAuthenticated, user, loading, login, logout, fetchSession } = useKeycloak()

onMounted(() => {
  fetchSession()
})

const handleLogin = () => login({ redirect: '/private' })
const handleLogout = () => logout({ redirect: '/' })
</script>

<template>
  <section class="layout">
    <div class="card hero">
      <p class="eyebrow">Keycloak + Nuxt</p>
      <h2>Fluxo PKCE pronto para SSR, rotas protegidas e cookies HttpOnly.</h2>
      <p class="muted">
        Use os botões abaixo para iniciar o fluxo de login, acessar a rota privada ou inspecionar a
        sessão via endpoint.
      </p>
      <div class="actions">
        <button :disabled="loading" @click="handleLogin">
          {{ loading ? 'Redirecionando...' : 'Login com Keycloak' }}
        </button>
        <NuxtLink class="secondary" to="/private">Ir para /private</NuxtLink>
        <NuxtLink class="secondary" to="/session">Ver sessão</NuxtLink>
        <button class="ghost" @click="handleLogout">Logout</button>
      </div>
    </div>

    <div class="card">
      <header>
        <p class="eyebrow">Estado</p>
        <strong class="status" :class="{ ok: isAuthenticated }">
          {{ isAuthenticated ? 'Autenticado' : 'Anônimo' }}
        </strong>
      </header>
      <dl>
        <div>
          <dt>Usuário</dt>
          <dd>{{ user?.preferred_username || '—' }}</dd>
        </div>
        <div>
          <dt>ID</dt>
          <dd class="mono">{{ user?.sub || '—' }}</dd>
        </div>
        <div>
          <dt>Nome</dt>
          <dd>{{ user?.name || '—' }}</dd>
        </div>
      </dl>
    </div>

    <div class="card">
      <header>
        <p class="eyebrow">Fluxo rápido</p>
      </header>
      <ol class="steps">
        <li>Configure as variáveis de ambiente (.env) conforme o README.</li>
        <li>Rode <code>npm install</code> e <code>npm run dev</code>.</li>
        <li>Abra <NuxtLink to="/api/auth/login?redirect=/private">/api/auth/login</NuxtLink> e faça
          login.</li>
        <li>Você volta para <code>/private</code>; veja a sessão em <code>/session</code>.</li>
      </ol>
    </div>

    <div class="card">
      <header>
        <p class="eyebrow">Endpoints prontos</p>
      </header>
      <ul class="list">
        <li><code>GET /api/auth/login</code> – PKCE + redirect</li>
        <li><code>GET /api/auth/callback</code> – troca code, grava cookie</li>
        <li><code>GET /api/auth/session</code> – estado atual</li>
        <li><code>POST /api/auth/refresh</code> – renova tokens</li>
        <li><code>POST /api/auth/logout</code> – apaga cookie e backchannel</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.layout {
  width: min(1040px, 100%);
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.card {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
}

.hero {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(94, 234, 212, 0.06));
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
  box-shadow: 0 8px 22px rgba(34, 211, 238, 0.35);
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:hover:not(:disabled),
.secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(34, 211, 238, 0.45);
}

.secondary {
  background: rgba(148, 163, 184, 0.12);
  color: #e2e8f0;
  box-shadow: none;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.ghost {
  background: transparent;
  color: #e2e8f0;
  border: 1px dashed rgba(148, 163, 184, 0.4);
  box-shadow: none;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

dl {
  display: grid;
  grid-template-columns: 120px 1fr;
  row-gap: 10px;
  column-gap: 6px;
  margin: 0;
}

dt {
  color: #94a3b8;
}

dd {
  margin: 0;
}

.mono {
  font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace;
  font-size: 13px;
}

.status {
  padding: 6px 10px;
  border-radius: 12px;
  background: rgba(239, 68, 68, 0.15);
  color: #fecdd3;
}

.status.ok {
  background: rgba(74, 222, 128, 0.2);
  color: #bbf7d0;
}

.steps {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: 6px;
  color: #cbd5e1;
}

.list {
  list-style: disc;
  padding-left: 20px;
  color: #cbd5e1;
  display: grid;
  gap: 6px;
}

code {
  background: rgba(148, 163, 184, 0.12);
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 13px;
}

@media (max-width: 640px) {
  .layout {
    grid-template-columns: 1fr;
  }

  dl {
    grid-template-columns: 1fr;
  }
}
</style>
