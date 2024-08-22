import ChangeExpireDateCommand from "@/appplication/cqrs/command/ChangeExpireDate/ChangeExpireDateCommand";
import {useUserInfoStore} from "@/domain/store/UserInfo.store";
import {dummy} from "@/appplication/cqrs/command/ChangeExpireDate/dummy";
import LinkInfo from "@/domain/model/LinkInfo";
import {ExceptionMsg} from "@/domain/enums/ExceptionMsg";
import {useRouter} from "vue-router";

const userInfoStore = useUserInfoStore()
const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const router = useRouter()
export const handleChangeExpireDate = async(command: ChangeExpireDateCommand, type: string) => {
    if (baseUrl === "dummy") {
        return Promise.resolve(dummy).then((result) => {
            return result;
        })
    } else {
        const response = await fetch(`${baseUrl}/change-expire-date`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(command)
        });
        if (!response.ok) {
            const message = await response.text()
            if (message.includes(ExceptionMsg.INVALID_TOKEN)) {
                // 直接登出
                userInfoStore.logout()
                await router.push({name: 'Login'})
                throw new Error("登入已過期");
            }
            throw new Error("更改失敗，請稍後再試");
        }

        return response.text().then((result) => {
            const id = command.id
            const expireDate = command.expireDate
            const linkInfo = new LinkInfo(id,  null, null, null, expireDate, null)
            userInfoStore.changeLinkInfo(type, linkInfo)
        })
    }

}