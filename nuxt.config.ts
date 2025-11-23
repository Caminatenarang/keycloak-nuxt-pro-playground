import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // opcional: remove o warning do Nitro
  compatibilityDate: '2025-11-23',

  modules: ['@caminatenarang/keycloak-nuxt-pro'],

  runtimeConfig: {
    keycloak: {
      baseUrl: process.env.KEYCLOAK_BASE_URL || 'http://localhost:8080/auth',
      realm: process.env.KEYCLOAK_REALM || 'myrealm',
      clientId: process.env.KEYCLOAK_CLIENT_ID || 'nuxt-client',
      redirectUri:
        process.env.KEYCLOAK_REDIRECT_URI || 'http://localhost:3000/api/auth/callback',
      logoutRedirectUri: process.env.KEYCLOAK_LOGOUT_REDIRECT_URI || 'http://localhost:3000/',
      cookieName: 'kc_token',
      cookieSameSite: 'lax',
      cookieSecure: true
    },
    keycloakPro: {
      licenseKey: process.env.KEYCLOAK_LICENSE_KEY,
      debug: false,
      loginTemplate: process.env.KEYCLOAK_LOGIN_TEMPLATE || 'default'
    },
    public: {
      keycloak: {
        baseUrl: process.env.KEYCLOAK_BASE_URL || 'http://localhost:8080/auth',
        realm: process.env.KEYCLOAK_REALM || 'myrealm',
        clientId: process.env.KEYCLOAK_CLIENT_ID || 'nuxt-client',
        redirectUri:
          process.env.KEYCLOAK_REDIRECT_URI || 'http://localhost:3000/api/auth/callback',
        logoutRedirectUri: process.env.KEYCLOAK_LOGOUT_REDIRECT_URI || 'http://localhost:3000/'
      },
      keycloakPro: {
        loginTemplate: process.env.KEYCLOAK_LOGIN_TEMPLATE || 'default'
      }
    }
  }
})
