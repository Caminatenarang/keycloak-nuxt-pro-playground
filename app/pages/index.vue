<script setup lang="ts">
const { isAuthenticated, user, loading, login, fetchSession } = useKeycloak()

onMounted(() => {
  fetchSession()
})

const handleLogin = () => login({ redirect: '/private' })
</script>

<template>
  <div class="page">
    <div class="glow glow-a" />
    <div class="glow glow-b" />

    <section class="card hero">
      <div class="hero-meta">
        <span class="pill">@caminatenarang/keycloak-nuxt-pro</span>
        <span class="pill subtle">PKCE • SSR • HttpOnly</span>
      </div>
      <h1>Keycloak + Nuxt PKCE Pro</h1>
      <p class="lede">
        Auth PKCE com SSR, HttpOnly cookies, middleware global, templates de login e suporte a
        Keycloak Cloud.
      </p>
      <div class="actions">
        <button :disabled="loading" @click="handleLogin">
          {{ loading ? 'Redirecionando...' : 'Login via Keycloak' }}
        </button>
        <NuxtLink class="ghost" to="/session">Ver sessão</NuxtLink>
      </div>
      <div class="status-grid">
        <div class="mini-card">
          <p class="label">Estado</p>
          <span class="status" :class="{ ok: isAuthenticated }">
            {{ isAuthenticated ? 'Autenticado' : 'Anônimo' }}
          </span>
        </div>
        <div class="mini-card">
          <p class="label">Utilizador</p>
          <p class="mono">{{ user?.preferred_username || '—' }}</p>
        </div>
        <div class="mini-card">
          <p class="label">Rota protegida</p>
          <NuxtLink class="link" to="/private">Ir para /private →</NuxtLink>
        </div>
      </div>
    </section>

    <section class="card feature-block">
      <header class="section-head">
        <div>
          <p class="eyebrow">Features principais</p>
          <h2>Pronto para produção</h2>
        </div>
        <NuxtLink class="link" to="/session">Ver sessão em tempo real</NuxtLink>
      </header>
      <div class="feature-grid">
        <article class="feature-card">
          <div class="icon">🔐</div>
          <h3>PKCE + HttpOnly secure auth</h3>
          <p>Fluxo completo com troca de code server-side, refresh e cookies seguros para SSR.</p>
        </article>
        <article class="feature-card">
          <div class="icon">🧭</div>
          <h3>Middleware SSR para rotas privadas</h3>
          <p>Proteção automática de páginas com validação de sessão antes de renderizar.</p>
        </article>
        <article class="feature-card">
          <div class="icon">🎨</div>
          <h3>Templates de login personalizados</h3>
          <p>Escolha entre default, split ou minimal sem mexer no fluxo principal.</p>
        </article>
      </div>
    </section>

    <section class="card quick-demo">
      <header class="section-head">
        <div>
          <p class="eyebrow">Demo rápida</p>
          <h2>Teste agora</h2>
        </div>
        <p class="hint">Fluxos reais já prontos em SSR</p>
      </header>
      <div class="demo-grid">
        <NuxtLink class="demo-card" to="/session">
          <span class="tag">/session</span>
          <p>Estado da sessão e claims do usuário.</p>
        </NuxtLink>
        <NuxtLink class="demo-card" to="/private">
          <span class="tag">/private</span>
          <p>Rota protegida com middleware global.</p>
        </NuxtLink>
        <NuxtLink class="demo-card" to="/auth/error">
          <span class="tag">/auth/error</span>
          <p>Exemplo de tela de erro para fluxo de auth.</p>
        </NuxtLink>
      </div>
    </section>

    <section class="card code">
      <header class="section-head">
        <div>
          <p class="eyebrow">Como funciona</p>
          <h2>Integração em minutos</h2>
        </div>
        <p class="hint">Uso direto com composables do módulo</p>
      </header>
      <div class="code-grid">
        <div class="code-card">
          <p class="label">Login</p>
          <pre><code>const { login } = useKeycloak()</code></pre>
        </div>
        <div class="code-card">
          <p class="label">Proteger rota</p>
          <pre><code>definePageMeta({ auth: true })</code></pre>
        </div>
        <div class="code-card">
          <p class="label">Sessão</p>
          <pre><code>const { user } = useKeycloak()</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  position: relative;
  width: min(1160px, 100%);
  display: grid;
  gap: 18px;
}

.glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  filter: blur(120px);
  opacity: 0.6;
}

.glow-a {
  background: radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.25), transparent 35%);
}

.glow-b {
  background: radial-gradient(circle at 80% 10%, rgba(94, 234, 212, 0.22), transparent 30%);
}

.card {
  position: relative;
  background: rgba(15, 23, 42, 0.78);
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 20px;
  padding: 22px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
}

.hero {
  overflow: hidden;
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(94, 234, 212, 0.06)),
    rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(56, 189, 248, 0.25);
}

.hero-meta {
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
  font-size: clamp(32px, 4vw, 44px);
  color: #f8fafc;
  letter-spacing: -0.02em;
}

.lede {
  margin: 0 0 14px;
  color: #cbd5e1;
  font-size: 18px;
  max-width: 720px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 12px 0 6px;
}

button,
.ghost {
  border: none;
  outline: none;
  padding: 12px 16px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 800;
  font-size: 15px;
  text-decoration: none;
  transition: transform 0.18s ease, box-shadow 0.2s ease, opacity 0.2s ease, border-color 0.2s ease;
}

button {
  color: #0f172a;
  background: linear-gradient(120deg, #22d3ee, #a5f3fc);
  box-shadow: 0 10px 28px rgba(34, 211, 238, 0.35);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  box-shadow: none;
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 16px 30px rgba(34, 211, 238, 0.45);
}

.ghost {
  color: #e2e8f0;
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.26);
}

.ghost:hover {
  border-color: rgba(94, 234, 212, 0.6);
  color: #67e8f9;
}

.status-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
}

.mini-card {
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.label {
  color: #94a3b8;
  font-size: 13px;
  margin: 0 0 6px;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 12px;
  background: rgba(248, 113, 113, 0.18);
  color: #fecdd3;
  font-weight: 700;
}

.status.ok {
  background: rgba(74, 222, 128, 0.2);
  color: #bbf7d0;
}

.mono {
  margin: 0;
  font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace;
  color: #e2e8f0;
  font-size: 14px;
}

.link {
  color: #67e8f9;
  text-decoration: none;
  font-weight: 700;
}

.link:hover {
  text-decoration: underline;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
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
  font-size: 24px;
  color: #f8fafc;
}

.hint {
  margin: 0;
  color: #94a3b8;
}

.feature-grid,
.demo-grid,
.code-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.feature-card,
.demo-card,
.code-card {
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.6);
  padding: 14px;
  transition: transform 0.15s ease, border-color 0.2s ease, background 0.2s ease;
}

.feature-card:hover,
.demo-card:hover,
.code-card:hover {
  transform: translateY(-3px);
  border-color: rgba(94, 234, 212, 0.45);
  background: rgba(15, 23, 42, 0.75);
}

.feature-card h3 {
  margin: 6px 0 6px;
  color: #e2e8f0;
  font-size: 17px;
}

.feature-card p {
  margin: 0;
  color: #cbd5e1;
}

.icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(94, 234, 212, 0.14);
  border: 1px solid rgba(94, 234, 212, 0.35);
  font-size: 18px;
}

.demo-card {
  text-decoration: none;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #e0f2fe;
  font-weight: 800;
  letter-spacing: 0.01em;
}

.demo-card p {
  margin: 6px 0 0;
  color: #cbd5e1;
}

.code pre {
  margin: 0;
}

pre {
  background: rgba(15, 23, 42, 0.8);
  border: 1px dashed rgba(148, 163, 184, 0.35);
  padding: 10px;
  border-radius: 12px;
  color: #e2e8f0;
  font-size: 14px;
  overflow-x: auto;
}

@media (max-width: 720px) {
  .actions {
    flex-direction: column;
    align-items: flex-start;
  }

  button,
  .ghost {
    width: 100%;
    text-align: center;
  }
}
</style>
