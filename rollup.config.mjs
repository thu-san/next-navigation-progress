import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

export default [
  // CommonJS and ES Module builds
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
      }),
    ],
    external: ['react', 'react-dom', '@mantine/core'],
  },
  // TypeScript declarations
  {
    input: 'src/index.tsx',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
    external: ['react', 'react-dom', '@mantine/core'],
  },
];