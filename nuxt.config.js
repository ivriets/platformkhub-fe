import webpack from 'webpack'
require('dotenv').config();
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Dashboard - KHUB Platform',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
    '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/click-outside' },
    { src: '~/plugins/date-picker', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/dayjs',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
    'nuxt-highcharts',
    // ['cookie-universal-nuxt', { alias: 'cookiz' }],
    'cookie-universal-nuxt',
    ['nuxt-tailvue', {
      modal: true
    }],
  ],

  dayjs: {
    locales: ['id'],
    defaultLocale: 'id',
    defaultTimeZone: 'Asia/Jakarta',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone', // import 'dayjs/plugin/timezone'
      'relativeTime',
      'advancedFormat'
    ] // Your Day.js plugin
  },

  i18n: {
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    locales: [
      {
        name: 'Indonesia',
        code: 'id',
        iso: 'id-ID',
        file: 'id-ID.js',
      },
      {
        name: 'English',
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js',
      },
    ],
    lazy: true,
    defaultLocale: 'en',
    langDir: 'locales/',
  },

  // router: {
  //   middleware: ['general']
  // },

  axios: {
    baseURL: 'https://base.api.k-hub.org',
    headers: {
      "Content-Type": "application/json",
    }
  },

  auth: {
    redirect: {
      // login: '/login',
      home: false,
      // logout: '/login'
      callback: '/callback',
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          maxAge: 1800,
          type: 'JWT'
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: '/a3/auth/', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: '/a3/accounts/', method: 'get' }
        },
        tokenRequired: true,
        tokenType: 'JWT',
        globalToken: true,
        // globalToken: true,
        // autoFetchUser: true
      },
    },
    plugins: [
      { src: "~/plugins/apiBase", mode: "client" },
      { src: "~/plugins/apiPlatform", mode: "client" },
      // { src: "~/plugins/axios", mode: "client" },
    ],
    cookie: {
      options: {
        sameSite: 'lax',
      },
    },

  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }
}
