/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import { makeServer } from './server'

if(process.env.NODE_ENV === 'development'){
  makeServer();
}


const app = createApp(App)

registerPlugins(app)



app.mount('#app')
