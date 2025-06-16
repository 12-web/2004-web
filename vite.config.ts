import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      proxy: {
        '/JSON': {
          target: env.VITE_API_ENDPOINT,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: '@hooks',
          replacement: path.resolve(__dirname, './src/hooks'),
        },
        {
          find: '@models',
          replacement: path.resolve(__dirname, './src/models'),
        },
        {
          find: '@store',
          replacement: path.resolve(__dirname, './src/store'),
        },
        {
          find: '@utils',
          replacement: path.resolve(__dirname, './src/utils'),
        },
        {
          find: '@components',
          replacement: path.resolve(__dirname, './src/components'),
        },
        {
          find: '@pages',
          replacement: path.resolve(__dirname, './src/pages'),
        },
        {
          find: '@styles',
          replacement: path.resolve(__dirname, './src/styles'),
        },
        {
          find: '@shared',
          replacement: path.resolve(__dirname, './src/shared'),
        },
      ],
    },
  }
})
