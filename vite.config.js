import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].[hash].v${env.VITE_APP_VERSION}.js`,
          chunkFileNames: `assets/[name].[hash].v${env.VITE_APP_VERSION}.js`,
          assetFileNames: `assets/[name].[hash}.v${env.VITE_APP_VERSION}.[ext]`,
        },
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION),
    },
  };
});
