import {useUserInfoStore} from "@/domain/store/UserInfo.store";
import {LinkType} from "@/domain/enums/LinkType";
import {ExceptionMsg} from "@/domain/enums/ExceptionMsg";
import {dummy} from "@/appplication/cqrs/command/EnabledLinkInfo/dummy";
import {useRouter} from "vue-router";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const userInfoStore = useUserInfoStore()
const router = useRouter()

export const handleEnabledLinkInfo = async (id) => {
    if (baseUrl === "dummy") {
        return Promise.resolve(dummy).then((json) => {
            return json;
        })
    } else {
        const linkInfo = userInfoStore.getLinkInfo(id, LinkType.DISABLED)
        const response = await fetch(`${baseUrl}/enable-link-info?id=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (!response.ok) {
            const message = await response.text()
            if (message.includes(ExceptionMsg.INVALID_TOKEN)) {
                // 直接登出
                userInfoStore.logout()
                await router.push({name: 'Login'})
                throw new Error("登入已過期");
            }
            throw new Error("啟動失敗，請稍後再試");
        }


        return response.text().then((result) => {
            userInfoStore.removeLinkInfo(id, LinkType.DISABLED)
            userInfoStore.addLinkInfo(linkInfo, LinkType.ENABLED)
        })
    }
}