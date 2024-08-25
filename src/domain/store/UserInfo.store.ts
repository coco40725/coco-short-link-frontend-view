import {defineStore} from "pinia";
import User from "@/domain/model/User";
import {jwtDecode} from "jwt-decode";
import {useCookies} from "vue3-cookies";
import {useRouter} from "vue-router";
import LinkInfo from "@/domain/model/LinkInfo";
import {LinkType} from "@/domain/enums/LinkType";
const { cookies } = useCookies();

const router = useRouter()
export const useUserInfoStore = defineStore("userInfo", {
    state: () => ({
        isLogin: false,
        isShortLinkInfoLoaded: false,
        user: <User>null,
        enabledShortLink: <LinkInfo[]>null,
        disabledShortLink: <LinkInfo[]>null,
    }),
    getters: {
        getIsLogin: (state) => state.isLogin,
        getUser: (state) => state.user,
        getEnabledShortLink: (state) => state.enabledShortLink,
        getDisabledShortLink: (state) => state.disabledShortLink,
    },
    actions: {
        logout(){
            this.isLogin = false
            this.user = null
            this.enabledShortLink = null
            this.disabledShortLink = null
            this.isShortLinkInfoLoaded = false
        },

        login(){
            try {
                const token = cookies.get('coco-token')
                const decoded = jwtDecode(token);
                const id = decoded['id']
                const name = decoded['name']
                const email = decoded['email']
                const user = { id, name, email,}

                this.isLogin = true
                this.user = user
            } catch (e) {
                console.log("login error")
            }
        },

        updateShortLinkInfo(enabledShortLink, disabledShortLink){
            this.enabledShortLink = enabledShortLink
            this.disabledShortLink = disabledShortLink
            this.isShortLinkInfoLoaded = true
        },

        getLinkInfo(id: string, type: string){
            if (type === LinkType.ENABLED) {
                return this.enabledShortLink.find((info: LinkInfo) => info.id === id)
            }

            if (type === LinkType.DISABLED) {
                return this.disabledShortLink.find((info: LinkInfo) => info.id === id)
            }
        },

        removeLinkInfo(id: string, type: string){
            if (type === LinkType.ENABLED) {
                const index = this.enabledShortLink.findIndex((info: LinkInfo) => info.id === id)
                if (index > -1) {
                    this.enabledShortLink.splice(index, 1)
                }
            }

            if (type === LinkType.DISABLED) {

                const index = this.disabledShortLink.findIndex((info: LinkInfo) => info.id === id)
                if (index > -1) {
                    this.disabledShortLink.splice(index, 1)
                }
            }
        },
        addLinkInfo(linkInfo: LinkInfo, type: string){
            if (type === LinkType.ENABLED) {
                this.enabledShortLink.push(linkInfo)
            }

            if (type === LinkType.DISABLED) {
                this.disabledShortLink.push(linkInfo)
            }
        },

        changeLinkInfo(type: string, linkInfo: LinkInfo){
            const id = linkInfo.id
            if (type === LinkType.ENABLED) {
                const index = this.enabledShortLink.findIndex((info: LinkInfo) => info.id === id)
                if (index > -1) {
                    if (linkInfo.originalLink !== null) {
                        this.enabledShortLink[index].originalLink = linkInfo.originalLink
                    }
                    if (linkInfo.expirationDate !== null) {
                        this.enabledShortLink[index].expirationDate = linkInfo.expirationDate
                    }
                }
            }

            if (type === LinkType.DISABLED) {
                const index = this.disabledShortLink.findIndex((info: LinkInfo) => info.id === id)
                if (index > -1) {
                    if (linkInfo.originalLink !== null) {
                        this.enabledShortLink[index].originalLink = linkInfo.originalLink
                    }
                    if (linkInfo.expirationDate !== null) {
                        this.enabledShortLink[index].expirationDate = linkInfo.expirationDate
                    }
                }
            }
        }
    }
})