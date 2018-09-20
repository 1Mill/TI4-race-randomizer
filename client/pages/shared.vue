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
		<div class='[ ph1 flex flex-column items-center ]'>
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

	mounted: function () {
		// Get generate players code from params
		const code = this.$route.query.code

		// Parse players from generated code
		this.players = JSON.parse(LZString.decompressFromEncodedURIComponent(code))

		// Get link with appropriate params
		this.link = window.location
	},

	components: {
		Button,
		Player
	},

	watch: {
		code: function (value) {
			this.players = JSON.parse(LZString.decompressFromEncodedURIComponent(value))
		}
	}
}
</script>

<style scoped>
</style>
