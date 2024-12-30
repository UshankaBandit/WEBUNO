import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "./Router/Index";
//import pinea from "./Store"

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')

createApp(App).use(router).use(pinia).mount("#app");
