import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Disable HMR overlay to prevent the error message
    hmr: {
      overlay: false
    }
  }
});