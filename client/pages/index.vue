<template>
	<article class='[ tc ]'>
		<header class='[ mb4 ]'>
			<h1 class='[ f4 ]'>Twilight Imperium 4 (TI4) race randomizer you can share with friends.</h1>
		</header>

		<Section>
			<Title class='[ mt0 ]'>Players</Title>
			<p class='[ lh-copy ]'>
				Number of players: <b class='[ ml1 f3 v-mid ]'>{{ players.length }}</b>
			</p>
			<div class='[ mb4 flex flex-row justify-center ]' style='gap: 3rem;'>
				<Button styling='d' @click.native='addPlayer'> Add player </Button>
				<Button styling='h' @click.native='removePlayer'> Remove player </Button>
			</div>
			<div>
				<label class='[ db mb2 ]'>Add names seperated by <b>,</b></label>
				<textarea
				v-model='player_names'
				placeholder='Bob, Roy, June' rows='4'
				class='[ w-80 pa1 ]'
				/>
			</div>
		</Section>

		<Section>
			<Title>Options</Title>
			<div class='[ flex flex-column items-center ]'>
				Races per player:
				<select
				v-model='races_per_player'
				class='[ mt1 pa1 ]'
				>
					<option
					v-for='i in Math.floor(races.length/players.length)' :key='i'
					:value='i' :selected='i == races_per_player'
					>
						{{ i }}
					</option>
				</select>
			</div>
			<div class='[ mt4 flex flex-column items-center ]'>
				Speaker selection:
				<select
				v-model='speaker_option'
				class='[ mt1 pa1 ]'
				>
					<option value = '1'>Don't give</option>
					<option value = '2'>Randomly give</option>
					<!-- <option value = '3' :disabled='races_per_player <= 1'>Randomly distribute with 1 fewer race choice</option> -->
				</select>
			</div>
		</Section>

		<Section>
			<Title>Races</Title>

			<div class='[ ph4 flex flex-column items-center ]'>
				<SymbolLegend />

				<ul class='[ list tl ]'>
					<li
					v-for='expansion in expansions'
					:key='expansion.key'
					class='[ pb2 ]'
					>
						<label>
							<input
							:checked='expansion.active'
							@click='toggleExpansion(expansion)'
							type='checkbox'
							/>
							{{ expansion.name }}
						</label>

						<ul class='[ list ]'>
							<li
							v-for='race in races.filter(r => r.expansion === expansion.key)'
							:key='race.name'
							class='[ lh-title ]'
							>
								<label>
									<input
									:checked='race.active'
									@click='toggleRace(race)'
									type='checkbox'
									/>
									{{ race.name }}
								</label>
							</li>
						</ul>
					</li>
				</ul>
			</div>

			<p class='[ lh-copy ]'>Select <b class='[ mh1 f3 v-mid ]'>{{ numberOfAdditionalRacesNeeded }}</b> additional races</p>

			<Button
			styling='c'
			@click.native='generatePlayerRaces'
			:disabled='numberOfAdditionalRacesNeeded !== 0'
			>
				Deal races
			</Button>

			<div class='[ mt5 flex justify-center ]'>
				<SymbolLegend />
			</div>

			<Button styling='h' @click.native='togglePlaceRacesShown'>
				{{ is_player_races_shown ? 'Hide' : 'Show' }} player races
			</Button>

			<div class='[ mt3 flex flex-column items-center ]' style='gap: 1.25rem;'>
				<Player
				v-for='player in players' :key='player.id'
				:player='player'
				/>
			</div>

			<div>
				<Button styling='c'
				:href='"/shared#" + generatePlayersString()'
				class='[ mt3 ]'
				>
					Share
				</Button>
			</div>
		</Section>
	</article>
</template>

<script>
import Button from '~/components/Button'
import Player from '~/components/Player'
import Section from '~/components/Section'
import SymbolLegend from '~/components/SymbolLegend'
import Title from '~/components/Title'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
	computed: {
		// Traditional Store States
		...mapState ([
			'expansions',
			'is_player_races_shown',
			'players',
			'races',
		]),

		races_per_player: {
			get () {
				return this.$store.state.races_per_player
			},
			set (value) {
				this.updateRacesPerPlayer(value)
			}
		},

		player_names: {
			get () {
				return this.$store.state.player_names
			},
			set (value) {
				this.updatePlayerNames(value)
			}
		},

		speaker_option: {
			get () {
				return this.$store.state.speaker_option
			},
			set (value) {
				this.$store.commit('PUT_SPEAKER_OPTION', value)
			}
		},

		// Getters for non-trivial things
		...mapGetters ([
			'activeRaces',
			'minNumberOfRaces',
			'numberOfAdditionalRacesNeeded',
			'playerCount',
		])
	},

	methods: {
		...mapActions([
			'addPlayer',
			'checkAllRaces',
			'generatePlayerRaces',
			'removePlayer',
			'revealPlayer',
			'toggleExpansion',
			'togglePlaceRacesShown',
			'toggleRace',
			'updatePlayerNames',
			'updateRacesPerPlayer',
		]),

		generatePlayersString: function() {
			const players = this.players.map(player => ({
				...player,
				revealed: this.is_player_races_shown,
			}))
			return LZString.compressToEncodedURIComponent(JSON.stringify(players))
		}
	},

	components: {
		Button,
		Player,
		Section,
		SymbolLegend,
		Title,
	}
}
</script>

<style>
</style>
