<template>
	<div>
		<ol>
			<li>Determine the number of players and/or Enter names</li>
			<li>Check the boxes for each race you want to play with</li>
			<li>Number of Choices per player</li>
			<li>Optional Speaker options</li>
			<li>Deal out races</li>
		</ol>

		<label>Player Count: </label>
		<select v-model='player_count'>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
		</select>

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
import { mapActions, mapGetters } from 'vuex'

export default {
	data: function () {
		return {
			player_count: 6
		}
	},

	computed: {
		...mapGetters([
			'races'
		])
	},

	methods: {
		...mapActions([
			'toggleRaceActiveStatus'
		])
	}
}
</script>

<style>
</style>
