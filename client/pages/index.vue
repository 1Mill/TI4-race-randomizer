<template>
	<div>
		<Section>
			<Title>Players</Title>
			<p class='[ lh-copy ]'>
				Number of players: <b class='[ ml1 f3 v-mid ]'>{{ players.length }}</b>
			</p>
			<div class='[ mb4 flex flex-row justify-around ]'>
				<Button styling='d' @click.native='addPlayer'> Add player </Button>
				<Button styling='h' @click.native='removePlayer'> Remove player </Button>
			</div>
			<div>
				<label class='[ dib mb2 ]'>Add names seperated by <b>;</b></label>
				<textarea
				v-model='player_names'
				placeholder='Bob; Joe; June' rows='4'
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
			<div class='[ flex flex-row justify-around ]'>
				<Button styling='d' @click.native='checkAllRaces(true)'> Check all </Button>
				<Button styling='h' @click.native='checkAllRaces(false)'> Uncheck all </Button>
			</div>

			<div class='[ ph4 tl flex flex-column ]'>
				<p class='[ lh-copy f7 ]'><b>*</b> races are recommended for new players</p>

				<label
				v-for='race in races' :key='race.name'
				class='[ pv1 ]'
				>
					<input
					type='checkbox' name='races' :checked='race.active'
					@click='toggleRace(race)'
					/>
					{{ race.name }}
				</label>
			</div>

			<p class='[ lh-copy ]'>Select <b class='[ mh1 f3 v-mid ]'>{{ numberOfAdditionalRacesNeeded }}</b> additional races</p>

			<Button
			styling='c'
			@click.native='generatePlayerRaces'
			:disabled='numberOfAdditionalRacesNeeded !== 0'
			>
				GENERATE
			</Button>
		</Section>

		<Player
		v-for='player in players' :key='player.id'
		:player='player'
		/>

		<div class='[ tc ]'>
			<Button styling='c'
			:href='"/shared/" + generatePlayersString()'
			>
				Share
			</Button>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Button from '~/components/Button'
import Player from '~/components/Player'
import Section from '~/components/Section'
import Title from '~/components/Title'

export default {
	computed: {
		// Traditional Store States
		...mapState ([
			'players',
			'races'
		]),

		// Store States that need to be updated using v-model
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
			'playerCount',
			'activeRaces',
			'minNumberOfRaces',
			'numberOfAdditionalRacesNeeded'
		])
	},

	methods: {
		...mapActions([
			'addPlayer',
			'removePlayer',
			'toggleRace',
			'checkAllRaces',
			'updateRacesPerPlayer',
			'generatePlayerRaces',
			'updatePlayerNames'
		]),

		generatePlayersString: function() {
			return LZString.compressToEncodedURIComponent(JSON.stringify(this.players))
		}
	},

	components: {
		Button,
		Player,
		Section,
		Title
	}
}
</script>

<style>
</style>
