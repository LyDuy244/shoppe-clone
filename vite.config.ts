import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vitest/config';  // Use this import to enable the `test` property
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  test: {
    environment: 'jsdom',
  },
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src")
    }
  }
})
