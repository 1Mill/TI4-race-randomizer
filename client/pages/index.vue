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

		...mapGetters ([
			'playerCount'
		])
	},

	methods: {
		...mapActions([
			'addPlayer',
			'removePlayer'
		])
	}
}
</script>

<style>
</style>
