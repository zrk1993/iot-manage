import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: filePath => {
          if (filePath.indexOf('node_modules') != -1) {
            // 如果这个文件路径，是来自 node_modules的，那么我们就进行发包
            return 'vendor'
          }
        }
      }
    }
  }
})
