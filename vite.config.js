import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
    '/api/v1/beta/register':'https://paperbrock-backend-beta.vercel.app/'
    }
  },
  plugins: [react()],
})
