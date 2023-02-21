import { readFileSync } from 'node:fs';
import typescript from '@rollup/plugin-typescript'
const packageJson = JSON.parse(
	readFileSync(new URL('./package.json', import.meta.url))
);
export default {
  input: './src/index.ts',
  output: [
    {
      format: 'cjs',
      file: packageJson.main,
    },
    {
      format: 'es',
      file: packageJson.module,
    },
  ],
  plugins: [typescript()],
}
