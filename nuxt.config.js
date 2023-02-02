import webpack from 'webpack'
// import path from 'path'
require('dotenv').config();
// import fs from 'fs'
const _ = require('lodash')

// const {BetaAnalyticsDataClient} = require('@google-analytics/data');

// const analyticsDataClient = new BetaAnalyticsDataClient();


export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Dashboard - KHUB SuperAdmin',
    titleTemplate: '%s | KHUB SuperAdmin',

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
    ],
    script: [
      // {
      //     src: "https://www.googletagmanager.com/gtag/js?id=G-XZNG8PQKQG",
      //     async: true,
      // },

      //   { src: "/js/ga.js"},

      ],


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
    { src: '~/plugins/vue2-filters' },
    { src: '~/plugins/drag', ssr:false },
    { src: '~/plugins/lightbox'},
    {
      src: "~/plugins/tinymce.js",
      mode: "client", 
    },
    {src: '~/plugins/gmap', mode: 'client'},

    // {  src: "~/plugins/gaReport.js"}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  loading: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // '@nuxtjs/google-analytics',
    'nuxt-gsap-module'
  ],
  gsap: {
    extraPlugins: {
      scrollTo: true,
      scrollTrigger: true
    },
    extraEases: {
      expoScaleEase: true
    }
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'cookie-universal-nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/dayjs',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
    'nuxt-highcharts',
    // ['cookie-universal-nuxt', { alias: 'cookiz' }],
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    ['nuxt-tailvue', {
      modal: true,
      toast: { 
        defaultProps: { 
            timeout: 3,
            classToast: 'bg-utama z-50',
            classTitle: 'text-white',
            classMessage: 'text-white',
            classClose: 'text-white',
            classTimeout: 'bg-gray-300',
        } 
    }

    }],
  ],
  server: {
    host: "0.0.0.0",
    port: 3333,
  },
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
  // googleAnalytics: {
  //   id: "G-DTPETM8Z78"
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

      google: {
        clientId: '981430623670-alri43dk2knfrc7j9rlg269mi5td3n1o.apps.googleusercontent.com',
        codeChallengeMethod: '',
        responseType: 'code',
        endpoints: {
          token: 'https://base.api.k-hub.org/a3/authGoogle/',
          userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo',
        }
      },

    },
    plugins: [
      { src: "~/plugins/apiBase", mode: "client" },
      { src: "~/plugins/apiPlatform", mode: "client" },
      { src: "~/plugins/api1", mode: "client" },
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
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        _: 'lodash',
        // analyticsDataClient: BetaAnalyticsDataClient
      })
    ],
    transpile: [
      /^gmap-vue($|\/)/, 
      // /^vue2-gmap-custom-marker($|\/)/
    ],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }
}
