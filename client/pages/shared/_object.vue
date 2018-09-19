<template>
	<div class='[ mt2 ]'>
		<div class='[ flex flex-column items-center ]'>
			<input
			type='text' disabled
			v-model='link'
			class='[ w-90 pa2 f7 ba br1 b--moon-gray bg-white ]'
			/>

			<Button styling='d'
			v-clipboard:copy='link'
			class='[ mt3 ]'
			>
				Copy link
			</Button>
		</div>
		<div class='[ ph1 flex flex-column ]'>
			<Player
			v-for='player in players' :key='player.id'
			:player='player'
			/>
		</div>
	</div>
</template>

<script>
import Button from '~/components/Button'
import Player from '~/components/Player'

export default {
	data: function () {
		return {
			players: [],
			link: ''
		}
	},

	created: function () {
		// Get object from params
		const string = this.$route.params['object']

		// Parse players from generated string
		this.players = JSON.parse(LZString.decompressFromEncodedURIComponent(string))
	},

	mounted: function () {
		this.link = window.location
	},

	components: {
		Button,
		Player
	}
}
</script>

<style scoped>
</style>
