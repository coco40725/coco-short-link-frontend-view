import {defineStore} from "pinia";

export const useCreateLinkModalStore = defineStore("createLinkModal", {
    state: () => ({
        showModal: false
    }),
    getters: {
        getShowModal: (state) => state.showModal
    },
    actions: {
        openModal(){
            this.showModal = true
        },
        closeModal() {
            this.showModal = false
        }
    }
})