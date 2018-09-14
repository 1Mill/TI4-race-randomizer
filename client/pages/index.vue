<template>
	<div>
		<ol>
			<li>Determine the number of players and/or Enter names</li>
			<li>Check the boxes for each race you want to play with</li>
			<li>Number of Choices per player</li>
			<li>Optional Speaker options</li>
			<li>Deal out races</li>
		</ol>

		<div>
			<button @click='addPlayer'>ADD PLAYER</button>
			<button @click='removePlayer'>REMOVE PLAYER</button>
		</div>

		<div
		v-for='player in players' :key='player.id'
		>
			{{ player }}
		</div>

		<p>Player Count: {{ playerCount }}</p>

		<div>
			<button @click='checkAllRaces(true)'>CHECK ALL</button>
			<button @click='checkAllRaces(false)'>UNCHECK ALL</button>
		</div>

		<div>
			<label
			v-for='race in races' :key='race.name'
			>
				<input type='checkbox' :checked='race.active' @click='toggleRace(race)'/>
				{{ race.name }} {{ race.active }}
			</label>
		</div>

		<p>Race Count: {{ races.length }}; Active Races: {{ activeRaces.length }}</p>

		<div>
			Races per Player:
			<select
			v-model='races_per_player'
			>
				<option
				v-for='i in Math.floor(races.length/players.length)' :key='i'
				:value='i' :selected='i == races_per_player'
				>
					{{ i }}
				</option>
			</select>
		</div>

		<p>Races per Player: {{ races_per_player }}</p>

		<button @click='generatePlayerRaces'>GENERATE</button>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	data: function () {
		return {
			player_names: ''
		}
	},

	computed: {
		players: {
			get () {
				return this.$store.state.players
			}
		},

		races: {
			get () {
				return this.$store.state.races
			}
		},

		races_per_player: {
			get () {
				return this.$store.state.races_per_player
			},
			set (value) {
				this.updateRacesPerPlayer(value)
			}
		},

		...mapGetters ([
			'playerCount',
			'activeRaces'
		])
	},

	methods: {
		...mapActions([
			'addPlayer',
			'removePlayer',
			'toggleRace',
			'checkAllRaces',
			'updateRacesPerPlayer',
			'generatePlayerRaces'
		])
	}
}
</script>

<style>
</style>
