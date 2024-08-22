import AddLinkInfoCommand from "@/appplication/cqrs/command/AddLinkInfo/AddLinkInfoCommand";
import {dummy} from "@/appplication/cqrs/command/AddLinkInfo/dummy";
import LinkInfo from "@/domain/model/LinkInfo";
import {ExceptionMsg} from "@/domain/enums/ExceptionMsg";
import {useUserInfoStore} from "@/domain/store/UserInfo.store";
import {useRouter} from "vue-router";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const userInfoStore = useUserInfoStore();
const router = useRouter()

export async function handleAddLinkInfo(command: AddLinkInfoCommand) {
     if (baseUrl === 'dummy') {
        return Promise.resolve(dummy).then((json) => {
            const data: LinkInfo = JSON.parse(json);
            return data;
        })
    } else {
        const response = await fetch(`${baseUrl}/add-link-info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(command),
            credentials: 'include',
        });


        if (!response.ok) {
            const message = await response.text()
            if (message.includes(ExceptionMsg.INVALID_TOKEN)) {
                // 直接登出
                userInfoStore.logout()
                await router.push({name: 'Login'})
                throw new Error("登入已過期");
            } else if (message.includes(ExceptionMsg.SHORT_LINK_IS_EXIST)) {
                throw new Error("短網址已存在");
            } else {
                throw new Error("新增短網址失敗，請稍後再試");
            }


        }

        return response.json().then((json) => {
            const data: LinkInfo = json
            return data;
        })
    }
}

