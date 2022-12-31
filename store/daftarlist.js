export const state = () => ({
    typeOrganisasi: null
})

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit({ commit, dispatch }) {
    await dispatch('storeDispatchFunc')
  },

  // axios...
  async storeDispatchFunc({ commit }) {
    const { typeOrganisasi } = await this.$apiPlatform.get('daftarList/kategori?kategori1=typeOrganisasi')
    console.log(typeOrganisasi)
    commit('SET_DATA', typeOrganisasi)
  },
}

export const mutations = {
  SET_DATA(state, theData) {
    state.typeOrganisasi = theData
  }
}