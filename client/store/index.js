import Vuex from 'vuex'
import Vue from 'vue'

const createStore = () => {
return new Vuex.Store({
	state: {
		races: [], // Race information (length)
		players: [], // Player information (length, name, associated race names)
		player_names: '',

		races_per_player: 2,

		speaker_option: 1
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
			Vue.set(race, 'active', false)
		},

		// Update race.active to TRUE
		PUT_RACE_ACTIVE_TO_TRUE: function (state, race) {
			Vue.set(race, 'active', true)
		},

		// Update store.races_per_player
		PUT_RACES_PER_PLAYER: function (state, value) {
			state.races_per_player = value
		},

		PUT_PLAYER_NAMES: function (state, string) {
			state.player_names = string
		},

		PUT_SPEAKER_OPTION: function (state, value) {
			state.speaker_option = value
		}
	},

	actions: {
		async nuxtServerInit ({ state, commit }) {
			// Init races to store
			const data = await this.$axios.$get(`/races`)
			commit('SET_RACES', data)

			// Add attribute attribute to races
			commit('INIT_RACE_ACTIVE_ATTRIBUTE')

			// Init 6 players (by default)
			for(let i = 1; i <= 6; i++) {
				commit('CREATE_PLAYER')
			}
		},

		addPlayer: function ({ state, commit }) {
			commit('CREATE_PLAYER')

			// Update races_per_player options
			const max = Math.floor(state.races.length/state.players.length)
			if (max < state.races_per_player) {
				commit('PUT_RACES_PER_PLAYER', max)
			}
		},

		removePlayer: function ({ commit }) {
			commit('DELETE_PLAYER')
		},

		toggleRace: function ({ commit }, race) {
			if (race.active === true) {
				// Turn false
				commit('PUT_RACE_ACTIVE_TO_FALSE', race)
			} else {
				commit('PUT_RACE_ACTIVE_TO_TRUE', race)
			}
		},

		checkAllRaces: function ({ state, commit }, boolean) {
			if (boolean === true) {
				state.races.forEach(race => commit('PUT_RACE_ACTIVE_TO_TRUE', race))
			} else {
				state.races.forEach(race => commit('PUT_RACE_ACTIVE_TO_FALSE', race))
			}
		},

		updateRacesPerPlayer: function ({ commit }, value) {
			commit('PUT_RACES_PER_PLAYER', value)
		},

		generatePlayerRaces: function ({ state, commit }) {
			const races_per_player = state.races_per_player
			const players = state.players
			const speaker_option = state.speaker_option

			// Get races such that race.active === true
			let races = state.races.filter(race => race.active === true).map(race => race.name)

			// Shuffle races
			races = _.shuffle(races)

			// Split races into partitions of size less than or equal to n (where n = races_per_player)
			races = _.chunk(races, races_per_player)

			// Distribute partitions to players
			players.forEach((player, index) => Vue.set(player, 'races', races[index]))

			// Add names to players
			const names = _.split(state.player_names, ';')
			players.forEach((player, index) => Vue.set(player, 'name', names[index] || 'unknown'))

			// Add speaker to player (1: Don't, 2: Random, 3: Random and -1 Race)
			if (speaker_option == 2) {
				_.sample(players).races.unshift('**SPEAKER**')
			}
		},

		updatePlayerNames: function ({ commit }, string) {
			commit('PUT_PLAYER_NAMES', string)
		}
	},

	getters: {
		playerCount: function (state) {
			return state.players.length
		},

		activeRaces: function (state) {
			return state.races.filter(race => race.active === true)
		},

		minNumberOfRaces: function (state) {
			return state.races_per_player * state.players.length
		},

		numberOfAdditionalRacesNeeded: function (state, getters) {
			return Math.max(0, getters.minNumberOfRaces - getters.activeRaces.length)
		}
	}
})
}

export default createStore
