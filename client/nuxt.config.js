const pkg = require('./package')
const webpack = require('webpack')

module.exports = {
	target: 'static',

	/*
	** Headers of the page
	*/
	head: {
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		],
		meta: [
			{ charset: 'utf-8' },
			{ hid: 'description', name: 'description', content: pkg.description },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		],
		title: pkg.name,
	},

	/*
	** Customize the progress-bar color
	*/
	loading: { color: '#FFFFFF' },

	/*
	** Global CSS
	*/
	css: [
		'tachyons',
		'~/assets/generic.extend-tachyons.css',
		'~/assets/generic.font.css',
	],

	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		'~/plugins/vue-clipboard2',
	],

	/*
	** Nuxt.js modules
	*/
	modules: [
		'@nuxtjs/axios',
	],

	axios: {
		baseURL: 'http://api:3000',
		retry: { retries: 3 },
	},

	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		extend(config, ctx) {
		},
		plugins: [
			new webpack.ProvidePlugin({
				'LZString': 'lz-string',
				'_': 'lodash',
			}),
		],
	},

	/*
	** Force server to check for changes within files in development
	*/
	watchers: {
		webpack: { poll: true },
	},
}
