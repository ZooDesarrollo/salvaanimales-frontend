import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: 'ONG Salva animales',
    title: 'ONG Salva animales',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/style.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/maps.js',
    '~/plugins/html2canvas.js',
    '~/plugins/subscriptionStatusMixin.js',
    {
      src: '~plugins/leaflet.js',
      ssr: false
    }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */


  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
  ],
  toast: {
    position: 'bottom-center',
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  auth: {
    autoLogout: true,
    localStorage: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/auth/local/",
            method: "post",
            propertyName: "jwt"
          },
          logout: false,
          user: {
            url: "/users/me/",
            method: "get",
            propertyName: false
          },
        },
        tokenRequired: true,
        tokenType: "Bearer"
      }
    },
    redirect: {
      login: "/bienvenido",
      logout: "/bienvenido",
      user: "/"
    }
  },

  axios: {
    baseURL: 'https://api.ongsalvaanimales.com'
    //baseURL: 'http://localhost:1337'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "cyan lighten-3",
          primary_obscure: "#019c93",
          verde_suave: "#d2ff44",
          verde_fuerte: "#5eb14e",
          secondary: "#ff1865",
          accent: "#ff1865",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {}
}
