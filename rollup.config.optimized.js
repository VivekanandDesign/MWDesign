// Rollup configuration for optimized CDN bundles
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';

const external = ['react', 'react-dom'];
const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM'
};

const baseConfig = {
  external,
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs({
      include: /node_modules/
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false
    }),
    json(),
    postcss({
      extract: true,
      minimize: true
    })
  ]
};

export default [
  // Main UMD bundle (optimized)
  {
    ...baseConfig,
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'MovingWallsDS',
      globals,
      sourcemap: true
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log']
        },
        mangle: {
          reserved: ['MovingWallsDS']
        }
      })
    ]
  },
  
  // ESM bundle (optimized)
  {
    ...baseConfig,
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.min.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
          module: true
        },
        format: {
          comments: false
        }
      })
    ]
  },
  
  // Component-specific bundles
  {
    ...baseConfig,
    input: {
      'components/Button': 'src/components/ui/Button.tsx',
      'components/Card': 'src/components/ui/Card.tsx',
      'components/Modal': 'src/components/ui/Modal.tsx',
      'components/Input': 'src/components/ui/Input.tsx',
      'components/Table': 'src/components/ui/Table.tsx'
    },
    output: {
      dir: 'dist/components',
      format: 'esm',
      entryFileNames: '[name].js',
      sourcemap: true
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        compress: {
          drop_console: true,
          module: true
        }
      })
    ]
  },
  
  // Tokens-only bundle
  {
    input: 'src/tokens/index.ts',
    output: [
      {
        file: 'dist/tokens-only.umd.js',
        format: 'umd',
        name: 'MovingWallsTokens',
        sourcemap: true
      },
      {
        file: 'dist/tokens-only.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false
      }),
      json(),
      terser()
    ]
  }
];
