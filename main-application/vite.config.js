import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/Note-Genie/',  // Ensure this matches your GitHub repository name
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Add alias for '@' to resolve to 'src' directory
    },
  },
});
