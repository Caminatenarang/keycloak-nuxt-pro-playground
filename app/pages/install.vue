<template>
  <div class="page">
    <div class="glow glow-a" />
    <div class="glow glow-b" />

    <section class="card hero">
      <div class="meta">
        <span class="pill">Setup</span>
        <span class="pill subtle">Nuxt + Keycloak</span>
      </div>
      <h1>Como instalar @caminatenarang/keycloak-nuxt-pro</h1>
      <p class="lede">
        Guia rápido para configurar PKCE com SSR, cookies HttpOnly e middleware global no Nuxt 4.
      </p>
    </section>

    <section class="card">
      <header class="section-head">
        <div>
          <p class="eyebrow">Passo 1</p>
          <h2>Adicionar .npmrc</h2>
        </div>
        <p class="hint">Autentique-se no GitHub Packages</p>
      </header>
      <pre><code># .npmrc
@caminatenarang:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}</code></pre>
    </section>

    <section class="card">
      <header class="section-head">
        <div>
          <p class="eyebrow">Passo 2</p>
          <h2>Instalar pacote</h2>
        </div>
        <p class="hint">Use seu gerenciador preferido</p>
      </header>
      <pre><code>npm install @caminatenarang/keycloak-nuxt-pro
# ou
pnpm add @caminatenarang/keycloak-nuxt-pro</code></pre>
    </section>

    <section class="card">
      <header class="section-head">
        <div>
          <p class="eyebrow">Passo 3</p>
          <h2>Configurar envs</h2>
        </div>
        <p class="hint">Copie para .env</p>
      </header>
      <pre><code># Auth server
KEYCLOAK_BASE_URL=https://sua-instancia
KEYCLOAK_REALM=meu-reino
KEYCLOAK_CLIENT_ID=nuxt-pro

# App
NUXT_PUBLIC_BASE_URL=http://localhost:3000
KEYCLOAK_REDIRECT_URI=${NUXT_PUBLIC_BASE_URL}/api/auth/callback
KEYCLOAK_LOGOUT_REDIRECT_URI=${NUXT_PUBLIC_BASE_URL}/
KEYCLOAK_SCOPE=openid profile email</code></pre>
    </section>

    <section class="card">
      <header class="section-head">
        <div>
          <p class="eyebrow">Passo 4</p>
          <h2>Configurar nuxt.config.ts</h2>
        </div>
        <p class="hint">Habilite o módulo</p>
      </header>
      <pre><code class="language-ts">// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@caminatenarang/keycloak-nuxt-pro'],
  keycloak: {
    baseUrl: process.env.KEYCLOAK_BASE_URL,
    realm: process.env.KEYCLOAK_REALM,
    clientId: process.env.KEYCLOAK_CLIENT_ID
  }
})</code></pre>
    </section>

    <section class="card">
      <header class="section-head">
        <div>
          <p class="eyebrow">Passo 5</p>
          <h2>Testar login</h2>
        </div>
        <p class="hint">Fluxo PKCE com SSR</p>
      </header>
      <pre><code>npm run dev
# Abra em outra aba
# 1) /api/auth/login?redirect=/private
# 2) /private
# 3) /session</code></pre>
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
  background: radial-gradient(circle at 18% 0%, rgba(56, 189, 248, 0.22), transparent 32%);
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

code {
  font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace;
}

@media (max-width: 720px) {
  .page {
    gap: 14px;
  }
}
</style>
