<template>
	<div>
		<ol>
			<li>Determine the number of players and/or Enter names</li>
			<li>Check the boxes for each race you want to play with</li>
			<li>Number of Choices per player</li>
			<li>Optional Speaker options</li>
			<li>Deal out races</li>
		</ol>

		<label>Player Count: </label> <span>{{ player_count }}</span>
		<label
		v-for='number in player_count_options' :key='number'
		@click='updatePlayerCount(number)'
		>
			<input type='radio' name='player_count' :value='number' :checked='number === player_count'/>{{ number }}
		</label>

		<br /><br />

		<label>Races per Player: </label> <span>{{ races_per_player }}</span>
		<label
		v-for='number in races_per_player_options' :key='number+100'
		@click='updateRaceDistribution(number)'
		>
			<input type='radio' name='races_per_player' :value='number' :checked='number === races_per_player'/>{{ number }}
		</label>

		<br /><br />

		<div
		v-for='race in races' :key='race.name'
		>
			<label>
				<input
				type='checkbox' :checked='race.active'
				@click='toggleRaceActiveStatus(race)'
				>
					{{ race.name }}
				</input>
			</label>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
	computed: {
		...mapState([
			'races',
			'player_count',
			'player_count_options',
			'races_per_player',
			'races_per_player_options'
		])
	},

	methods: {
		...mapActions([
			'toggleRaceActiveStatus',
			'updatePlayerCount',
			'updateRaceDistribution'
		])
	}
}
</script>

<style>
</style>
