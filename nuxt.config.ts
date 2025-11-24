import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // Remove warnings do Nitro e garante comportamento estável no Vercel
  compatibilityDate: "2025-11-23",

  modules: ["@caminatenarang/keycloak-nuxt-pro"],

  runtimeConfig: {
    /**
     * KEYCLOAK RUNTIME (server only)
     */
    keycloak: {
      baseUrl: process.env.KEYCLOAK_BASE_URL || "http://localhost:8080",
      realm: process.env.KEYCLOAK_REALM || "myrealm",
      clientId: process.env.KEYCLOAK_CLIENT_ID || "nuxt-client",

      redirectUri:
        process.env.KEYCLOAK_REDIRECT_URI ||
        "http://localhost:3000/api/auth/callback",

      logoutRedirectUri:
        process.env.KEYCLOAK_LOGOUT_REDIRECT_URI || "http://localhost:3000/",

      cookieName: "kc_token",
      cookieSameSite: "lax",
      cookieSecure: true,
    },

    /**
     * PRO FEATURES (server only)
     */
    keycloakPro: {
      licenseKey: process.env.KEYCLOAK_LICENSE_KEY || "",
      licensePublicKey: process.env.KEYCLOAK_LICENSE_PUBLIC_KEY || "",
      debug: false,
      loginTemplate: process.env.KEYCLOAK_LOGIN_TEMPLATE || "default",
    },

    /**
     * PUBLIC RUNTIME (client + server)
     */
    public: {
      keycloak: {
        baseUrl: process.env.KEYCLOAK_BASE_URL || "http://localhost:8080",
        realm: process.env.KEYCLOAK_REALM || "myrealm",
        clientId: process.env.KEYCLOAK_CLIENT_ID || "nuxt-client",

        redirectUri:
          process.env.KEYCLOAK_REDIRECT_URI ||
          "http://localhost:3000/api/auth/callback",

        logoutRedirectUri:
          process.env.KEYCLOAK_LOGOUT_REDIRECT_URI || "http://localhost:3000/",
      },

      keycloakPro: {
        loginTemplate: process.env.KEYCLOAK_LOGIN_TEMPLATE || "default",
      },
    },
  },
});
