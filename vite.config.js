import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    '/':'https://paperbrock-backend-beta.vercel.app/api/v1/beta/register'
  }
})
