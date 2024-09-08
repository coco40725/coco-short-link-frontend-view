import { createApp } from 'vue'

import { createPinia } from "pinia";
import router from "@/view/router";
import App from "@/App.vue";
import vue3GoogleLogin from 'vue3-google-login'
import CanvasJSChart from '@canvasjs/vue-charts';
import {useUserInfoStore} from "@/domain/store/UserInfo.store";
import {useCreateLinkModalStore} from "@/domain/store/CreateLinkModal.store";
import {useToastAlertStore} from "@/domain/store/ToastAlert.store";
import {useToastSuccessStore} from "@/domain/store/ToastSuccess.store";
import {CommandFactory} from "@/application/cqrs/command/base/CommandFactory";
import {QueryFactory} from "@/application/cqrs/query/base/QueryFactory";


const pinia = createPinia()
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
const app = createApp(App);
app.use(CanvasJSChart); // install the CanvasJS Vuejs Chart Plugin
app.use(router)
app.use(pinia)
app.use(vue3GoogleLogin, {
    clientId: clientId
})

//  export store
export const userInfoStore = useUserInfoStore()
export const createLinkModalStore = useCreateLinkModalStore()
export const toastAlertStore = useToastAlertStore()
export const toastSuccessStore = useToastSuccessStore()

// export commandFactory
export const commandFactory = new CommandFactory()

// export queryFactory
export const queryFactory = new QueryFactory()

app.mount("#app");

