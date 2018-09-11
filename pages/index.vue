<template>
	<div>
		<ol>
			<li>Check the boxes for each race you want to play with</li>
			<li>Determine the number of players and/or Enter names</li>
			<li>Number of Choices per player</li>
			<li>Optional Speaker options</li>
			<li>Deal out races</li>
		</ol>
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
