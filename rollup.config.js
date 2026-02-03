import {babel} from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

/**
 * @external RollupConfig
 * @type {object}
 * @see {@link https://rollupjs.org/guide/en#big-list-of-options}
 */

/**
 * @param {object} [config]
 * @param {boolean} [config.minifying]
 * @param {string} [config.format]
 * @returns {object}
 */
function getRollupObject ({minifying, format = 'umd'} = {}) {
  const nonMinified = {
    input: 'src/stackblur.js',
    output: {
      format,
      sourcemap: minifying,
      file: `dist/stackblur${minifying ? '.min' : ''}.${
        format === 'es' ? 'm' : ''
      }js`,
      name: 'StackBlur'
    },
    plugins: [
      babel({
        babelHelpers: 'bundled'
      })
    ]
  };
  if (minifying) {
    nonMinified.plugins.push(terser());
  }
  return nonMinified;
}

export default [
  getRollupObject({minifying: false, format: 'umd'}),
  getRollupObject({minifying: false, format: 'es'}),
  getRollupObject({minifying: true, format: 'umd'}),
  getRollupObject({minifying: true, format: 'es'})
];
