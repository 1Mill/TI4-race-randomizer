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

		<button @click='generatePlayerRaces' :disabled='numberOfAdditionalRacesNeeded !== 0'>GENERATE</button>

		<p
		v-for='player in players' :key='player.id'
		>
			{{ player.id }}({{ player.name }}):
			<span
			v-for='(race, index) in player.races'
			>
				({{ index + 1 }}) <b>{{ race }}</b>
			</span>
		</p>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	computed: {
		players: {
			get () {
				return this.$store.state.players
			}
		},

		races: {
			get () {
				return this.$store.state.races
			}
		},

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
	}
}
</script>

<style>
</style>
