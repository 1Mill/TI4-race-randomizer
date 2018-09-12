import Vuex from 'vuex'

const createStore = () => {
return new Vuex.Store({
	state: {
		races: [],

		player_count: 6,
		player_count_options: [2, 3, 4, 5, 6, 7, 8],

		races_per_player: 2,
		races_per_player_options: 2
	},

	mutations: {
		SET_RACE_ACTIVE_FALSE: function (race) {
			race.active = false
		},

		SET_RACE_ACTIVE_TRUE: function (race) {
			race.active = true
		},

		SET_STORE_RACES: function (state, races) {
			state.races = races
		},

		CREATE_ACTIVE_ATTRIBUTE_ON_RACES: function (state) {
			state.races.forEach(function(e) { e.active = true })
		},

		UPDATE_PLAYER_COUNT: function (state, value) {
			state.player_count = value
		},

		UPDATE_RACES_PER_PLAYER: function (state, value) {
			state.races_per_player = value
		},

		UPDATE_RACES_PER_PLAYER_OPTIONS: function (state) {
			const players = state.player_count
			const races = state.races.length

			state.races_per_player_options = Math.floor(races / players)
		}
	},

	actions: {
		async nuxtServerInit ({ commit }) {
			const data = await this.$axios.$get(`/races`)
			commit('SET_STORE_RACES', data)
			commit('CREATE_ACTIVE_ATTRIBUTE_ON_RACES')
		},

		toggleRaceActiveStatus ({ commit }, race) {
			if (race.active === true) {
				commit('SET_RACE_ACTIVE_FALSE', race)
			} else {
				commit('SET_RACE_ACTIVE_TRUE', race)
			}
		},

		updatePlayerCount: function ({ state, commit }, value) {
			// Update player ocunt
			commit('UPDATE_PLAYER_COUNT', value)

			// Update races per player options
			commit('UPDATE_RACES_PER_PLAYER_OPTIONS')

			// Update races per player
			if (state.races_per_player_options < state.races_per_player) {
				commit('UPDATE_RACES_PER_PLAYER', state.races_per_player_options)
			}
		},

		updateRaceDistribution: function ({ commit }, value) {
			commit('UPDATE_RACES_PER_PLAYER', value)
		}
	},

	getters: {
		active_races: function (state) {
			return state.active_races = state.races.filter(race => race.active == true).map(race => race.name)
		}
	}
})
}

export default createStore
