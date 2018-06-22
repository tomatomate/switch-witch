module.exports = {
	presets: [
		[
			'@babel/preset-env', {
				targets: {
					node: '6.10'
				}
			}
		],
		'@babel/preset-react',
		'@babel/preset-flow'
	],
	plugins: [
		'@babel/plugin-transform-runtime',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-transform-regenerator',
		//'add-module-exports',
		//'emotion',
	]
}
