<template>
	<div>
		INDIVIDUAL RACE

		<br /><br />

		{{ race }}
	</div>
</template>

<script>
export default {
	data: function () {
		return {
			race: {}
		}
	},

	mounted: function () {
		const url_name = this.$route.params.url_name

		this.race = this.$store.state.races.find(race => race.urlName === url_name)
	}
}
</script>

<style scoped>
</style>
