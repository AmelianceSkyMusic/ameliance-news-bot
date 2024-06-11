module.exports = {
	plugins: ['simple-import-sort'],
	rules: {
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^react'],
					['^next'],
					['^@?\\\\w'],
					['@/(.*)'],
					['^~'],
					['^~/ameliance-ui'],
					['^[./]'],
					['^~assets'],
					['@.+.(sc|sa|c)ss$'],
					['.(sc|sa|c)ss$'],
					['.module.(sc|sa|c)ss$'],
				],
			},
		],
	},
};
