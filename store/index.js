export const state = () => {
    return {
      pageTitle: '',
      drawer: true,
      drawerOpen: 256,
      drawerClose: 60,
      halamanBlog: null,
      halamanResource: null,
      halamanEvent: null,
      halamanProgram: null,
      selectedBahasa: 'en'
    }
  }
  export const mutations = {
    setPageTitle (state, pageTitle) {
      state.pageTitle = pageTitle
    },
    setDrawer (state, drawer) {
      state.drawer = drawer
    },
    setHalamanBlog(state, halamanBlog) {
      state.halamanBlog = halamanBlog
    },
    setHalamanResource(state, halamanResource) {
      state.halamanResource = halamanResource
    },
    setHalamanEvent(state, halamanEvent) {
      state.halamanEvent = halamanEvent
    },
    setHalamanProgram(state, halamanProgram) {
      state.halamanProgram = halamanProgram
    },
    setSelectedBahasa(state, selectedBahasa) {
      state.selectedBahasa = selectedBahasa
    }

  }
  export const actions = {
    nuxtServerInit ({ commit }, { req }) {
      let pageTitle = ''
      commit('setPageTitle', pageTitle)
    },
    // nuxtServerInit ({ commit }, { req }) {
    //   let drawer = null
    //   commit('setDrawer', drawer)
    // }
  }