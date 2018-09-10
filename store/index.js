import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      races: []
    },

    mutations: {
		setStoreRaces: function (state, payload) {
			state.races = payload
		},

		addActiveAttributeToRaces: function (state) {
			state.races.forEach(function(e) { e.active = true })
		}
    },

	actions: {
		async nuxtServerInit ({ commit }) {
			const data = await this.$axios.$get(`/TI4_RaceData.json`)
			commit('setStoreRaces', data)
			commit('addActiveAttributeToRaces')
		}
	},

	getters: {
	}
  })
}

export default createStore
