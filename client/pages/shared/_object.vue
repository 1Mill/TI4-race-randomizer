<template>
	<div class='[ ph1 flex flex-column ]'>
		<Player
		v-for='player in players' :key='player.id'
		:player='player'
		/>
	</div>
</template>

<script>
import Player from '~/components/Player'

export default {
	data: function () {
		return {
			players: []
		}
	},

	created: function () {
		const string = this.$route.params['object']
		this.players = JSON.parse(LZString.decompressFromEncodedURIComponent(string))
	},

	components: {
		Player
	}
}
</script>

<style scoped>
</style>
