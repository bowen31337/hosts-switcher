import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

import copy from './src/rollupPlugins/copy'

import postcss from 'rollup-plugin-postcss'


const production = !process.env.ROLLUP_WATCH

export default [{
		input: 'src/main.js',
		output: [
			{ file: './main.js', format: 'cjs' }
		],
		external: ['electron', 'electron-reloader', 'path', 'url', 'fs-extra', 'os', 'child_process']
	},
	{
		input: 'src/renderer.js',
		output: [
			{ file: './renderer.js', format: 'cjs' },
		],
		plugins: [postcss({
			extract: true
			// plugins: []
		}), resolve(), commonjs(), babel(),copy({src:'./src/index.html',dest:'./index.html'}),production && uglify()],
		watch: {
			chokidar: true,
		},
		external: ['path', 'fs', 'electron', 'os', 'child_process']

	}
]
