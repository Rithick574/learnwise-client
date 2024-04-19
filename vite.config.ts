import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
      "@redux": path.resolve(process.cwd(), "./src/redux"),
      "@lib": path.resolve(process.cwd(), "./src/lib"),
      "@public": path.resolve(process.cwd(), "./public"),
    },
  },
});
