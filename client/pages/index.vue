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
			'checkAllRaces'
		])
	}
}
</script>

<style>
</style>
