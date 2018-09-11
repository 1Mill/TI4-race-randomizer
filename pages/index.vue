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
			{{ race.name }} {{ race.active }}
		</div>

		<div>
			{{ active_races }}
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters([
			'races',
			'active_races'
		])
	}
}
</script>

<style>
</style>
