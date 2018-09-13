import Vuex from 'vuex'

const createStore = () => {
return new Vuex.Store({
	state: {
		races: [],
		players: [],

		player_count: 6,
		player_count_options: [2, 3, 4, 5, 6, 7, 8],

		races_per_player: 2,
		races_per_player_options: 2
	},

	mutations: {
		SET_RACE_ACTIVE_FALSE: function (state, race) {
			race.active = false
		},

		SET_RACE_ACTIVE_TRUE: function (state, race) {
			race.active = true
		},

		SET_STORE_RACES: function (state, races) {
			state.races = races
		},

		CREATE_ACTIVE_ATTRIBUTE_ON_RACES: function (state) {
			state.races.forEach(function(e) { e.active = true })
		},

		CREATE_PLAYER: function (state, name) {
			state.players.push(
				{
					name: name,
					races: []
				}
			)
		},

		DELETE_PLAYER: function (state) {
			state.players.pop()
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
		async nuxtServerInit ({ state, commit }) {
			// Init races
			const data = await this.$axios.$get(`/races`)
			commit('SET_STORE_RACES', data)
			commit('CREATE_ACTIVE_ATTRIBUTE_ON_RACES')

			// Init players
			for(let i = 1; i <= state.player_count; i++) {
				commit('CREATE_PLAYER', "Player " + i)
			}
		},

		toggleRaceActiveStatus ({ commit }, race) {
			if (race.active === true) {
				commit('SET_RACE_ACTIVE_FALSE', race)
			} else {
				commit('SET_RACE_ACTIVE_TRUE', race)
			}
		},

		updatePlayerCount: function ({ state, commit }, value) {
			// Delete players if value is lesser
			for(let i = 0; i < (state.player_count - value); i++) {
				commit('DELETE_PLAYER')
			}

			// Add players if value is greater
			for(let i = 0; i < (value - state.player_count); i++) {
				commit('CREATE_PLAYER', "Player " + (state.player_count + 1 + i))
			}

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
		},

		generateRacesForPlayers: function ({ state }) {
			const per_player = state.races_per_player
			const players = state.players

			// Filter only active races
			let active_races = state.active_races = state.races.filter(race => race.active == true).map(race => race.name)

			// Randomly shuffle array
			active_races = _.shuffle(active_races)

			// Split races into n partisions (of equal size ideally)
			active_races = _.chunk(active_races, per_player)

			// Remove last partision, as it it has unequal size
			active_races.pop()

			// console.log(active_races)
			// console.log(_.sampleSize(active_races, players.length))

			players.forEach((player, index) => player.races = active_races[index])
		}
	},

	getters: {
	}
})
}

export default createStore
