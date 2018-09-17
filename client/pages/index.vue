<template>
	<div>
		<ol>
			<li>Determine the number of players and/or Enter names</li>
			<li>Check the boxes for each race you want to play with</li>
			<li>Number of Choices per player</li>
			<li>Optional Speaker options</li>
			<li>Deal out races</li>
		</ol>

		<div>
			<label>Player names (seperated by ; or ,):</label>
			<textarea v-model='player_names' placeholder='Bob; Joe; June' />
		</div>

		<p>Player Names String: {{ player_names }}</p>

		<div>
			<button @click='addPlayer'>ADD PLAYER</button>
			<button @click='removePlayer'>REMOVE PLAYER</button>
		</div>

		<p>
			Number of Players: {{ playerCount }}
		</p>

		<div>
			<button @click='checkAllRaces(true)'>CHECK ALL</button>
			<button @click='checkAllRaces(false)'>UNCHECK ALL</button>
		</div>

		<fieldset>
			<label
			v-for='race in races' :key='race.name'
			style='display: block;'
			>
				<input
				type='checkbox' name='races' :checked='race.active'
				@click='toggleRace(race)'
				/>
				{{ race.name }}
			</label>
		</fieldset>

		<p>Select <b>{{ numberOfAdditionalRacesNeeded }}</b> additional races (selected: {{ activeRaces.length }}; min: {{ minNumberOfRaces }})</p>

		<div>
			Races per Player:
			<select
			v-model='races_per_player'
			>
				<option
				v-for='i in Math.floor(races.length/players.length)' :key='i'
				:value='i' :selected='i == races_per_player'
				>
					{{ i }}
				</option>
			</select>
		</div>

		<p>Races per Player: {{ races_per_player }}</p>

		<div>
			Speaker Option:
			<select v-model='speaker_option'>
				<option value = '1'>Don't distribute</option>
				<option value = '2'>Randomly distribute</option>
				<!-- <option value = '3' :disabled='races_per_player <= 1'>Randomly distribute with 1 fewer race choice</option> -->
			</select>
		</div>

		<p>Speaker Option: {{ speaker_option }}</p>

		<Button
		styling='c'
		@click.native='generatePlayerRaces'
		:disabled='numberOfAdditionalRacesNeeded !== 0'
		>
			GENERATE
		</Button>

		<p
		v-for='player in players' :key='player.id'
		>
			{{ player.id }} ({{ player.name }}):
			<span
			v-for='(race, index) in player.races'
			>
				({{ index + 1 }}) <b>{{ race }}</b>
			</span>
		</p>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Button from '~/components/Button'

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
		])
	},

	components: {
		Button
	}
}
</script>

<style>
</style>
