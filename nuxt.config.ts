import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins = config.plugins || []
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  runtimeConfig: {
    public: {
      googleClientId:
        import.meta.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID ||
        '287415882924-rjhl4ugdfmqgam7lq3e3m4jjguj70a1l.apps.googleusercontent.com',
    },
  },
})