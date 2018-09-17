<template>
	<a
	class='[ dib no-underline br2 ]'
	:class='getStylingClasses'
	:style='disabled ? "cursor: not-allowed; opacity: 0.5;" : "" '
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
		},

		disabled: {
			type: Boolean
		}
	},

	computed: {
		getStylingClasses: function () {
			let class_style = ''

			switch(this.styling) {
				// Champion
				case 'c':
					class_style += '[ pv3 ph4 white bg-brand-first hover-bg-brand-first-dark shadow-4 ]'
					break

				// Driver
				case 'd':
					class_style += '[ pv2 ph3 brand-first ba bw1 hover-brand-first-dark shadow-4 ]'
					break

				// Driver White
				case 'dw':
					class_style += '[ pv2 ph3 white ba bw1 hover-moon-gray shadow-4 ]'
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
