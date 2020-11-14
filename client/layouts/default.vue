<template>
	<div class='[][ flex-ns flex-row-ns justify-center-ns ]'>
		<div class='[][ w-50-ns  ]'>
			<div class='[ pa2 flex flex-row justify-between ]'>
				<Button styling='h' href='/'>Homepage</Button>
				<Button styling='hw' href='https://github.com/1Mill/twilight-imperium-race-selector' target='_blank'>Source code</Button>
			</div>

			<nuxt
			class='[ mb4 ]'
			/>
		</div>
	</div>
</template>

<script>
import Button from '~/components/Button'

export default {
	components: {
		Button
	}
}
</script>

<style>
</style>
