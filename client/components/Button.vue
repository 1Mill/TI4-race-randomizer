<template>
	<a
	:class='getClassStyle'
	>
		<slot />
	</a>
</template>

<script>
export default {
	props: {
		styling: {
			required: true,
			type: String
		}
	},

	computed: {
		getClassStyle: function () {
			let class_style = 'dib br1'

			switch(this.styling) {
				// Champion
				case 'c':
					class_style += '[ pv3 ph4 white bg-brand-first hover-bg-brand-first-dark _Button ]'
					break

				// Driver
				case 'd':
					class_style += '[ pv2 ph3 brand-first ba bw1 hover-brand-first-dark  ]'
					break

				// Driver White
				case 'dw':
					class_style += '[ pv2 ph3 white ba bw1 hover-moon-gray ]'
					break

				// Helper
				case 'h':
					class_style += '[ pv2 ph3 brand-second hover-brand-second-dark underline-hover ]'
					break

				// Helper white
				case 'hw':
					class_style += '[ pv2 ph3 moon-gray hover-silver underline-hover ]'
			}

			return class_style
		}
	}
}
</script>

<style scoped>
</style>
