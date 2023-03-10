<template>
	<div class='[ w-100 mv2 flex flex-row justify-between ][][ pr4-l ]'>
		<h1 class='[ w-40 f5 lh-title tr ][][ w-50-l ]'>
			<div v-if='player.name === "unknown"'>{{ player.id }}</div>
			<div v-else>{{ player.name }}</div>
		</h1>
		<div class='[ w-60 pl3 tl ][][ w-50-l ]'>
			<div v-if='player.speaker === true'>
				<b>SPEAKER</b>
			</div>
			<div v-if='player.revealed === true' class='[ flex flex-column ]' style="gap: 1rem;">
				<a
				v-for='race in player.races'
				:key='race'
				:href="getRaceUrl(race)"
				target="_blank"
				class="[ db ]"
				>
					{{ race }}
				</a>
			</div>
			<div v-else class='[ mb4 flex flex-row justify-around ]'>
				<Button
				styling='d'
				@click.native='revealPlayer(player)'
				>
					Reveal races
				</Button>
			</div>
		</div>
		<br /> <!-- Added so that copy + paste is broken up into groups -->
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import Button from '~/components/Button'

import { default as RACES_DATA } from '../data/races.json'

export default {
	props: {
		player: {
			required: true,
			type: Object
		}
	},

	methods: {
		...mapActions([
			'revealPlayer'
		]),
		getRaceUrl(name) {
			const { races } = RACES_DATA;
			const r = races.find(r => r.name === name)
			return r['url']
		},
	},

	components: {
		Button
	}
}
</script>
