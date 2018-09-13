import Vuex from 'vuex'
import Vue from 'vue'

const createStore = () => {
return new Vuex.Store({
	state: {
		races: [], // Race information (length)
		players: [], // Player information (length, name, associated race names)

		player_number_options: _.range(2, 9) // Number of possible players (2 to 8)
	},

	mutations: {
		// Add race.active attribute to all races
		INIT_RACE_ACTIVE_ATTRIBUTE: function (state) {
			state.races.forEach(race => Vue.set(race, 'active', true))
		},

		// Set store.races array
		SET_RACES: function (state, races) {
			state.races = races
		},

		// Add player
		CREATE_PLAYER: function (state, optional_name) {
			const index = Math.max(_.lastIndexOf(state.players), 0) + 1
			const name = optional_name || 'unknown'

			if (state.players.length < 8) {
				state.players.push(
					{
						id: 'Player ' + index,
						name: name,
						races: []
					}
				)
			}
		},

		// Remove last player from array
		DELETE_PLAYER: function (state) {
			if (state.players.length > 2) {
				state.players.pop()
			}
		},

		// Update race.active to FALSE
		PUT_RACE_ACTIVE_TO_FALSE: function (state, race) {
			race.active = false
		},

		// Update race.active to TRUE
		PUT_RACE_ACTIVE_TO_TRUE: function (state, race) {
			race.active = true
		}
	},

	actions: {
		async nuxtServerInit ({ state, commit }) {
			// Init races to store
			const data = await this.$axios.$get(`/races`)
			commit('SET_STORE_RACES', data)

			// Add attribute attribute to races
			commit('INIT_RACE_ACTIVE_ATTRIBUTE')

			// Init 6 players (by default)
			for(let i = 1; i <= 6; i++) {
				commit('CREATE_PLAYER')
			}
		},

		addPlayer: function ({ commit }) {
			commit('CREATE_PLAYER')
		},

		removePlayer: function ({ commit }) {
			commit('DELETE_PLAYER')
		}
	},

	getters: {
		playerCount: function (state) {
			return state.players.length
		}
	}
})
}

export default createStore
