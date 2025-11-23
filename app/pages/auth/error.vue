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
  <section class="card">
    <p class="eyebrow">Callback</p>
    <h2>Erro ao autenticar</h2>
    <p class="muted">
      O Keycloak devolveu um erro durante o fluxo. Confira os detalhes abaixo ou volte para tentar de
      novo.
    </p>

    <div class="error-box">
      <p class="label">error</p>
      <p class="value mono">{{ error }}</p>
      <p class="label">error_description</p>
      <p class="value">{{ description }}</p>
    </div>

    <div class="actions">
      <NuxtLink class="secondary" to="/">Voltar</NuxtLink>
      <NuxtLink class="ghost" to="/api/auth/login">Tentar novamente</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.card {
  width: min(720px, 100%);
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

.error-box {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.28);
  color: #fecdd3;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 14px;
}

.label {
  color: #fecdd3;
  margin: 0 0 4px;
  font-size: 13px;
}

.value {
  margin: 0 0 8px;
  color: #e2e8f0;
}

.mono {
  font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace;
}

.actions {
  display: flex;
  gap: 10px;
}

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
</style>
