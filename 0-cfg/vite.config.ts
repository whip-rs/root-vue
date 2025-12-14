import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnpluginFonts from 'unplugin-fonts/vite'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
  root: '1-src',
  publicDir: false,
  plugins: [
    vue(),
    svgLoader(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core'
      ],
      dts: '../0-cfg/auto-imports.d.ts',
      vueTemplate: true,
    }),
    Components({
      dts: '../0-cfg/components.d.ts',
      // Allow unplugin-vue-components to auto-register SVG files as Vue components
      // 'root' in this config is 1-src, so components and assets/svg are relative to that
      dirs: ['components', 'assets/svg'],
      extensions: ['vue', 'svg'],
      deep: true,
    }),
    UnpluginFonts({
      // https://github.com/unplugin/unplugin-fonts
      // If you have font files in 1-src/assets/fonts/ that INCLUDE a stylesheet.css, 
      // they are automatically imported by index.ts.
      // If you want to use this plugin to generate faces or load from Google:
      google: {
        families: [],
      },
      custom: {
        families: [],
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../1-src', import.meta.url))
    }
  },
  build: {
    outDir: '../2-dist',
    emptyOutDir: true
  },
  css: {
    devSourcemap: true
  }
})
