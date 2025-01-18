import Vuex from 'vuex'
import Vue from 'vue'

import { default as EXPANSIONS_DATA } from '~/data/expansions.json'
import { default as RACES_DATA } from '~/data/races.json'

const createStore = () => new Vuex.Store({
	state: {
		expansions: [], // Selected expansions
		player_names: '',
		players: [], // Player information (length, name, associated race names)
		races: [], // Race information (length)

		races_per_player: 2,

		speaker_option: 1,

		is_player_races_shown: true,
	},

	mutations: {
		// Set state.expansions array
		SET_EXPANSIONS: function (state, expansions) {
			state.expansions = expansions
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
						races: [],
						revealed: state.is_player_races_shown,
						speaker: false,
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

		REVEAL_PLAYER: function (state, player) {
			player.revealed = true
		},

		PUT_IS_PLAYER_RACES_SHOWN: function (state, value) {
			state.is_player_races_shown = value
		},

		PUT_EXPANSION_ACTIVE_TO_FALSE: function (state, expansion) {
			Vue.set(expansion, 'active', false)
		},

		// Update race.active to TRUE
		PUT_EXPANSION_ACTIVE_TO_TRUE: function (state, expansion) {
			Vue.set(expansion, 'active', true)
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
		},
	},

	actions: {
		async nuxtServerInit ({ state, commit }) {
			// Load expansions into state
			const { expansions } = EXPANSIONS_DATA
			commit('SET_EXPANSIONS', expansions)

			// Load races into state
			const { races } = RACES_DATA
			commit('SET_RACES', races.sort((a,b) => a.name.localeCompare(b.name)))

			// Default all races to active
			state.expansions.filter(exp => exp.active).forEach(exp => {
				state.races.filter(r => r.expansion === exp.key).forEach(r => commit('PUT_RACE_ACTIVE_TO_TRUE', r))
			})

			// Create 6 players by default
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

		revealPlayer: function ({ commit }, player) {
			commit('REVEAL_PLAYER', player)
		},

		toggleExpansion: function({ state, commit }, expansion) {
			if (expansion.active === true) {
				commit('PUT_EXPANSION_ACTIVE_TO_FALSE', expansion)
				state.races.filter(r => r.expansion === expansion.key).forEach(r => commit('PUT_RACE_ACTIVE_TO_FALSE', r))
			} else {
				commit('PUT_EXPANSION_ACTIVE_TO_TRUE', expansion)
			}
		},

		toggleRace: function ({ commit }, race) {
			if (race.active === true) {
				commit('PUT_RACE_ACTIVE_TO_FALSE', race)
			} else {
				commit('PUT_RACE_ACTIVE_TO_TRUE', race)
			}
		},

		togglePlaceRacesShown: function({ state, commit }) {
			commit('PUT_IS_PLAYER_RACES_SHOWN', !state.is_player_races_shown)
			state.players.forEach((player) => Vue.set(player, 'revealed', state.is_player_races_shown))
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

		generatePlayerRaces: function ({ state, commit, getters }) {
			const is_player_races_shown = state.is_player_races_shown
			const players = state.players
			const races_per_player = state.races_per_player
			const speaker_option = state.speaker_option

			if (getters.numberOfAdditionalRacesNeeded !== 0) { return }

			// Get races such that race.active === true
			let races = state.races.filter(race => race.active === true).map(race => race.name)

			// Shuffle races
			races = _.shuffle(races)

			// Split races into partitions of size less than or equal to n (where n = races_per_player)
			races = _.chunk(races, races_per_player)

			// Distribute partitions to players
			players.forEach((player, index) => Vue.set(player, 'races', races[index]))

			// Add names to players
			const names = _.split(state.player_names, ',')
			players.forEach((player, index) => Vue.set(player, 'name', names[index] || 'unknown'))

			// Remove speaker from all players
			players.forEach((player) => Vue.set(player, 'speaker', false))

			// Add speaker to player (1: Don't, 2: Random, 3: Random and -1 Race)
			if (speaker_option == 2) {
				Vue.set(_.sample(players), 'speaker', true)
			}

			players.forEach((player) => Vue.set(player, 'revealed', is_player_races_shown))
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

export default createStore
