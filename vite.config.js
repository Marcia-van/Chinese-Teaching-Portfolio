import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 删掉了 base 路径，让它在本地根目录运行
export default defineConfig({
  plugins: [react()],
})