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

		<div class='[ ph1 flex flex-column items-center ]' style='gap: 1.25rem;'>
			<SymbolLegend />

			<Player
			v-for='player in players' :key='player.id'
			:player='player'
			/>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import Button from '~/components/Button'
import Player from '~/components/Player'
import SymbolLegend from '~/components/SymbolLegend'

export default {
	data: function () {
		return {
			players: [],
			link: ''
		}
	},

	mounted: function () {
		// Get generate players code from hash (excluding the "#" symbol)
		const code = window.location.hash.substring(1)

		// Parse players from generated code
		this.players = JSON.parse(LZString.decompressFromEncodedURIComponent(code))

		// Get link with appropriate params
		this.link = window.location
	},

	methods: {
		...mapActions([
			'revealPlayer'
		])
	},

	components: {
		Button,
		Player,
		SymbolLegend,
	}
}
</script>

<style scoped>
</style>
