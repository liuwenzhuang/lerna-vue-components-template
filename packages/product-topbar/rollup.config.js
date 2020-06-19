import commonjs from '@rollup/plugin-commonjs' // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue' // Handle .vue SFC files
import buble from '@rollup/plugin-buble' // Transpile/polyfill with reasonable browser support
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS } from '@babel/core'
const path = require('path')

export default {
  input: 'lib/index.ts', // Path relative to package.json
  output: {
    name: 'ProductTopbar',
    exports: 'named',
    globals: {
      vue: 'Vue',
      'vue-class-component': 'VueClassComponent',
      'vue-property-decorator': 'VuePropertyDecorator',
    },
  },
  external: [
    'vue',
    'vue-class-component',
    'vue-property-decorator',
    '@babel/runtime',
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      clean: true,
    }),
    commonjs(),
    vue({
      css: true, // Dynamically inject css as a <style> tag
      compileTemplate: true, // Explicitly convert template to render function
    }),
    babel({
      extensions: [...DEFAULT_EXTENSIONS, 'ts', 'tsx'],
      configFile: path.resolve(__dirname, 'babel.config.js'),
      babelHelpers: 'runtime',
    }),
    buble(), // Transpile to ES5
  ],
}
