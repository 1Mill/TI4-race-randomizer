import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      races: []
    },

    mutations: {
		setStoreRaces: function (state, payload) {
			state.races = payload
		}
    },

	actions: {
		async nuxtServerInit ({ commit }) {
			const data = await this.$axios.$get(`/TI4_RaceData.json`)
			commit('setStoreRaces', data)
		}
	},

	getters: {
	}
  })
}

export default createStore
