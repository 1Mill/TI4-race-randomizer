<template>
	<div>
		<div
		v-for='race in races' :key='race.name'
		>
			<Button styling='d'
			:href='"/races/" + race.urlName'
			>
				{{ race.name }} :: {{ race.urlName }}
			</Button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Button from '~/components/Button'

export default {
	computed: {
		...mapState ([
			'races'
		])
	},

	components: {
		Button
	}
}
</script>
