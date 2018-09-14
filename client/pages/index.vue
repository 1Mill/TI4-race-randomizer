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
			<a @click='addPlayer'>ADD PLAYER</a>
			<a @click='removePlayer'>REMOVE PLAYER</a>
		</div>

		<div
		v-for='player in players' :key='player.id'
		>
			{{ player }}
		</div>

		<p>Player Count: {{ playerCount }}</p>

		<div>
			<a @click='checkAllRaces(true)'>CHECK ALL</a>
			<a @click='checkAllRaces(false)'>UNCHECK ALL</a>
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
