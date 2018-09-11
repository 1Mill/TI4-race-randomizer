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
		},

		changeRaceActiveStatus: function (race) {
			race.active = !race.active
		},
    },

	actions: {
		async nuxtServerInit ({ commit }) {
			const data = await this.$axios.$get(`/TI4_RaceData.json`)
			commit('setStoreRaces', data)
			commit('addActiveAttributeToRaces')
		},

		toggleRaceActiveStatus ({ commit }, race) {
			commit('changeRaceActiveStatus', race)
		}
	},

	getters: {
		races: function (state) {
			return state.races
		},

		active_races: function (state) {
			return state.active_races = state.races.filter(race => race.active == true).map(race => race.name)
		}
	}
  })
}

export default createStore
