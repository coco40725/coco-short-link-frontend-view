import { createApp } from 'vue'

import { createPinia } from "pinia";
import router from "@/view/router";
import App from "@/App.vue";
import vue3GoogleLogin from 'vue3-google-login'
import CanvasJSChart from '@canvasjs/vue-charts';



const pinia = createPinia()
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
const app = createApp(App);
app.use(CanvasJSChart); // install the CanvasJS Vuejs Chart Plugin
app.use(router)
app.use(pinia)
app.use(vue3GoogleLogin, {
    clientId: clientId
})
app.mount("#app");
