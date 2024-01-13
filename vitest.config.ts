import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const config = defineConfig({
  test: {
    globals: true,
    root: './',
    coverage: {
      enabled: false,
      provider: 'v8',
      include: ['src/**/*.ts'],
      all: false,
      clean: true,
      cleanOnRerun: true,
      thresholds: {
        perFile: true,
        autoUpdate: true,
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
  plugins: [
    tsconfigPaths(),
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
  ],
});

export default config;
