<template>
	<div class='[ mt5 tc ]'>
		<Button styling='c'>Button text</Button>
		<br /><br />
		<Button styling='d'>Button text</Button>
		<br /><br />
		<div class='[ pv2 bg-gray ]'>
			<Button styling='dw'>Button text</Button>
		</div>
		<br />
		<Button styling='h'>Button text</Button>
		<br /><br />
		<Button styling='hw'>Button text</Button>
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

<style scoped>
</style>
