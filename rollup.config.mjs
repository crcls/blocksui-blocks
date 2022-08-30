import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import ignore from 'rollup-plugin-ignore'
import json from '@rollup/plugin-json'

import fs from 'fs'

const ignored = [
  'tests',
  'hooks',
  'contract',
  'utils',
  'types.ts',
  'Toggle.tsx'
]

function getInputs(path) {
  const files = fs.readdirSync(path)
  return files
    .filter(file => {
      return !ignored.includes(file) && !file.endsWith('.test.tsx')
    })
    .map(file => (`./src/blocks/${file}`))
}

const extensions = ['.js','.ts','.tsx']
const inputs = getInputs('./src/blocks')
const isProd = process.env.NODE_ENV === 'production'

export default inputs.map(input => ({
  input,
  output: {
    dir: './dist/assets/blocks',
    minifyInternalExports: false
  },
  preserveEntrySignatures: 'strict',
  plugins: [
    ignore(['react', 'styled-components']),
    resolve({
      extensions,
      mainFields: ['main', 'browser'],
      preferBuiltins: true,
    }),
    commonjs({
      include: /node_modules/,
      transformMixedEsModules: true,
      defaultIsModuleExports: 'auto',
      requireReturnsDefault: 'auto'
    }),
    json({ compact: isProd, namedExports: true }),
    typescript({
      tsconfig: './tsconfig.blocks.json'
    }),
    getBabelOutputPlugin({
      plugins: ['./plugins/LazyExport.mjs']
    }),
    isProd && terser(),
  ]
}))
