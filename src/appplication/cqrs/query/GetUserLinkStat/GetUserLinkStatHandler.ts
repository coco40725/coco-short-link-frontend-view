import LinkStat from "@/domain/model/LinkStat";
import {dummy} from "@/appplication/cqrs/query/GetUserLinkStat/dummy";
import {useRouter} from "vue-router";
import {useUserInfoStore} from "@/domain/store/UserInfo.store";
import {ExceptionMsg} from "@/domain/enums/ExceptionMsg";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const router = useRouter()
const userInfoStore = useUserInfoStore();

export const handleGetUserShortLinkInfo = async (link) => {
    if (baseUrl === "dummy") {
        return Promise.resolve(dummy).then((json) => {
            const data: LinkStat = JSON.parse(json);
            return data;
        })
    } else {
        const response = await fetch(`${baseUrl}/user/link-stat?shortLink=${link}`, {
            method: 'GET',
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

            throw new Error("查詢失敗，請稍後再試");
        }

        return response.json().then((json) => {
            const data: LinkStat = json
            return data;
        })
    }
}