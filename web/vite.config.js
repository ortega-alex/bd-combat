import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default ({mode}) => {
  return defineConfig({
    plugins: [react()],
    base: './',
    server: {
        port: 3000
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    define: {
        __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
        'process.env': { ...loadEnv(mode, process.cwd(), '') }
    }
  })
}
