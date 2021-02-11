import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// styles
import '@fortawesome/fontawesome-free/css/all.css'
import 'bulma/css/bulma.css'
import './styles/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')