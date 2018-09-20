<template>
	<div class='[][ flex-ns flex-row-ns justify-center-ns ]'>
		<div class='[][ w-50-ns  ]'>
			<nuxt
			class='[ mb4 ]'
			/>

			<div class='[ pv2 bg-brand-second flex flex-row justify-around ]'>
				<Button styling='dw' href='/'>Home / Restart</Button>
				<Button styling='hw' href='https://github.com/1Mill/twilight-imperium-race-selector' target='_blank'>Source code</Button>
			</div>
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
