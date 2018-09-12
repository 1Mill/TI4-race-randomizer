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
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
		</select>

		<label>Choices per Player:</label>
		<select v-model='races_per_player'>
			<option
			v-for='number in race_count_options_per_player' :key='number'
			:option='number'
			>{{ number }}</option>
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
			player_count: 6,
			races_per_player: 2,
			race_count_options_per_player: 2
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
	},

	watch: {
		player_count: function (value) {
			// Update number of race options per player
			this.race_count_options_per_player = Math.floor(this.races.length / value)

			// Update choices per player if nesseary
			let max = Math.max(this.race_count_options_per_player)

			if (max < this.races_per_player) {
				this.races_per_player = max
			}
		}
	}
}
</script>

<style>
</style>
