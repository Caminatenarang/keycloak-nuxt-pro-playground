<script setup lang="ts">
const route = useRoute()

const error = computed(() => (route.query.error as string) || 'unknown_error')
const description = computed(
  () =>
    (route.query.error_description as string) ||
    'A callback retornou um erro. Verifique o Keycloak e tente novamente.'
)
</script>

<template>
  <div class="page">
    <div class="glow glow-a" />
    <div class="glow glow-b" />

    <section class="card hero">
      <div class="meta">
        <span class="pill">Auth callback</span>
        <span class="pill subtle">Erro detectado</span>
      </div>
      <h1>Falha ao autenticar</h1>
      <p class="lede">
        O Keycloak devolveu um erro durante o fluxo. Revise os detalhes abaixo ou volte para tentar
        novamente.
      </p>

      <div class="alert">
        <p class="label">error</p>
        <p class="value mono">{{ error }}</p>
        <p class="label">error_description</p>
        <p class="value">{{ description }}</p>
      </div>

      <div class="actions">
        <NuxtLink class="primary" to="/">Voltar à home</NuxtLink>
        <NuxtLink class="ghost" to="/api/auth/login">Tentar login novamente</NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  position: relative;
  width: min(760px, 100%);
}

.glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  filter: blur(120px);
  opacity: 0.55;
}

.glow-a {
  background: radial-gradient(circle at 15% 0%, rgba(248, 113, 113, 0.28), transparent 32%);
}

.glow-b {
  background: radial-gradient(circle at 80% 10%, rgba(94, 234, 212, 0.18), transparent 28%);
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
  border: 1px solid rgba(248, 113, 113, 0.35);
  background: linear-gradient(135deg, rgba(248, 113, 113, 0.12), rgba(94, 234, 212, 0.08)),
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
  background: rgba(248, 113, 113, 0.16);
  border: 1px solid rgba(248, 113, 113, 0.35);
  color: #ffe4e6;
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
  font-size: clamp(28px, 4vw, 36px);
  color: #f8fafc;
  letter-spacing: -0.02em;
}

.lede {
  margin: 0 0 12px;
  color: #cbd5e1;
  font-size: 17px;
}

.alert {
  margin: 12px 0 14px;
  padding: 14px;
  border-radius: 12px;
  background: rgba(248, 113, 113, 0.18);
  border: 1px solid rgba(248, 113, 113, 0.4);
  color: #ffe4e6;
}

.label {
  color: #fecdd3;
  margin: 0 0 4px;
  font-size: 13px;
}

.value {
  margin: 0 0 10px;
  color: #f8fafc;
}

.value:last-of-type {
  margin-bottom: 0;
}

.mono {
  font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.primary,
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

.primary {
  color: #0f172a;
  background: linear-gradient(120deg, #22d3ee, #a5f3fc);
  box-shadow: 0 10px 26px rgba(34, 211, 238, 0.35);
}

.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(34, 211, 238, 0.45);
}

.ghost {
  background: transparent;
  color: #e2e8f0;
  border: 1px dashed rgba(148, 163, 184, 0.4);
}

.ghost:hover {
  border-color: rgba(248, 113, 113, 0.6);
  color: #fecdd3;
}

@media (max-width: 640px) {
  .actions {
    flex-direction: column;
  }

  .primary,
  .ghost {
    width: 100%;
    text-align: center;
  }
}
</style>
