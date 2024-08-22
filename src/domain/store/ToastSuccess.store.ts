import {defineStore} from "pinia";

export const useToastSuccessStore = defineStore("toastSuccess",{
    state: () => ({
        msg: "",
        showToast: false
    }),
    getters: {
        getMsg: (state) => state.msg,
        getShowToast: (state) => state.showToast
    },
    actions: {
        setMsg(msg: string){
            this.msg = msg
        },
        openToast(){
            this.showToast = true
            // close alert after 3 seconds
            setTimeout(() => {
                this.showToast = false
                this.msg = ""
            }, 2000)
        },
        closeToast(){
            this.showToast = false
        }
    }
})