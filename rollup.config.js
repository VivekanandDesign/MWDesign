import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'fs';

// Read package.json
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  'react/jsx-runtime'
];

const plugins = [
  resolve({
    browser: true,
    preferBuiltins: false
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.build.json',
    declaration: true,
    declarationDir: './dist/types',
    outDir: './dist',
    exclude: ['**/*.stories.tsx', '**/*.test.tsx']
  }),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }),
  postcss({
    extract: 'styles/index.css',
    minimize: true,
    use: ['sass']
  })
];

export default [
  // ESM build
  {
    input: 'src/index.ts',
    external,
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    },
    plugins
  },
  
  // CommonJS build
  {
    input: 'src/index.ts',
    external,
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    plugins
  },
  
  // UMD build for CDN
  {
    input: 'src/index.ts',
    external: ['react', 'react-dom'],
    output: {
      file: pkg.unpkg,
      format: 'umd',
      name: 'MWDesignSystem',
      sourcemap: true,
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
      }
    },
    plugins: [
      ...plugins,
      terser()
    ]
  }
];
