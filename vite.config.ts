import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import postcssPxToRem from 'postcss-pxtorem';

export default defineConfig({
  plugins: [vue(), vueDevTools()], resolve: {
    alias: {
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@icons': fileURLToPath(new URL('./src/components/icons', import.meta.url)),
      '@atoms': fileURLToPath(new URL('./src/components/atoms', import.meta.url)),
      '@molecules': fileURLToPath(new URL('./src/components/molecules', import.meta.url)),
      '@organisms': fileURLToPath(new URL('./src/components/organisms', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  }, css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler', additionalData: '@use "@assets/scss/main.scss" as *;' },
    }, postcss: {
      plugins: [
        postcssPxToRem({
          rootValue: 16,
          unitPrecision: 3,
          propList: ['*', '!border*'],
          replace: true,
          mediaQuery: true,
          minPixelValue: 2,
        }),
      ],
    },
  },
});
