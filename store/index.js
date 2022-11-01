export const state = () => {
    return {
      pageTitle: '',
      drawer: true,
      drawerOpen: 256,
      drawerClose: 60
    }
  }
  export const mutations = {
    setPageTitle (state, pageTitle) {
      state.pageTitle = pageTitle
    },
    setDrawer (state, drawer) {
      state.drawer = drawer
    }
  }
  export const actions = {
    nuxtServerInit ({ commit }, { req }) {
      let pageTitle = null
      commit('setPageTitle', pageTitle)
    },
    // nuxtServerInit ({ commit }, { req }) {
    //   let drawer = null
    //   commit('setDrawer', drawer)
    // }
  }