import {dummy} from "@/appplication/cqrs/command/DisabledLinkInfo/dummy";
import {useUserInfoStore} from "@/domain/store/UserInfo.store";
import {LinkType} from "@/domain/enums/LinkType";
import {useRouter} from "vue-router";
import {ExceptionMsg} from "@/domain/enums/ExceptionMsg";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const userInfoStore = useUserInfoStore()
const router = useRouter()

export const handleDisabledLinkInfo = async (id) => {
    if (baseUrl === "dummy") {
        return Promise.resolve(dummy).then((json) => {
            return json;
        })

    } else {
        const linkInfo = userInfoStore.getLinkInfo(id, LinkType.ENABLED)
        const response = await fetch(`${baseUrl}/disable-link-info?id=${id}`, {
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
            throw new Error("刪除失敗，請稍後再試");
        }

        return response.json().then((result) => {
            userInfoStore.removeLinkInfo(id, LinkType.ENABLED)
            userInfoStore.addLinkInfo(linkInfo, LinkType.DISABLED)
        })
    }
}