import UserShortLinkInfo from "@/domain/model/UserShortLinkInfo";
import {dummy} from "@/appplication/cqrs/query/GetUserShortLinkInfo/dummy";
import {useUserInfoStore} from "@/domain/store/UserInfo.store";
import {useRouter} from "vue-router";
import {ExceptionMsg} from "@/domain/enums/ExceptionMsg";
import {handleLogout} from "@/appplication/cqrs/command/Logout/LogoutHandler";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const userInfoStore = useUserInfoStore();
const router = useRouter()
export const handleGetUserShortLinkInfo = async () => {
    if (baseUrl === "dummy") {
        return Promise.resolve(dummy).then((json) => {
            const data: UserShortLinkInfo = JSON.parse(json);
            return data;
        })
    } else {
        const response = await fetch(`${baseUrl}/user/link-info`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            // 直接登出
            await handleLogout()
            await router.push({name: 'Login'})
            throw new Error("登入已過期");
        }

        return response.json().then((json) => {
            const data: UserShortLinkInfo = json
            userInfoStore.updateShortLinkInfo(data.enabledShortLinkInfo, data.disabledShortLinkInfo)
            return data;
        })
    }
}