<template>
	<div class='[ mv3 flex flex-row justify-between items-center ]'>
		<h1 class='[ w-30 f5 lh-title tr ]'>
			<div v-if='player.name==="unknown"'>{{ player.id }}</div>
			<div v-else>{{ player.name }}</div>
		</h1>
		<div class='[ w-70 pl3 ]'>
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
