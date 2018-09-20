<template>
	<div class='[ w-100 mv2 flex flex-row justify-between items-center ][][ pr4-l ]'>
		<h1 class='[ w-40 f5 lh-title tr ][][ w-50-l ]'>
			<div v-if='player.name==="unknown"'>{{ player.id }}</div>
			<div v-else>{{ player.name }}</div>
		</h1>
		<div class='[ w-60 pl3 tl ][][ w-50-l ]'>
			<div
			v-for='(race, index) in player.races' :key='race'
			>
				{{ race }}
			</div>
		</div>
		<br /> <!-- Added so that copy + paste is broken up into groups -->
	</div>
</template>

<script>
export default {
	props: {
		player: {
			required: true,
			type: Object
		}
	}
}
</script>
