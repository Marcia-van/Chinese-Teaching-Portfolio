import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 加上这一行，必须和你的仓库名一致
  base: '/Chinese-Teaching-Portfolio/',
})