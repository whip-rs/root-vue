import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './index.vue'

// Auto-ingest styles (recursive within css/)
// This will pull in any .css files inside `1-src/css/` and its subdirectories.
// Vite exposes import.meta.glob which pulls files into the bundle eagerly.
import.meta.glob(['./css/**/*.css', './assets/fonts/**/*.css'], { eager: true })

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
