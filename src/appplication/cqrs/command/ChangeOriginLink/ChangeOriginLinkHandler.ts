import {useUserInfoStore} from "@/domain/store/UserInfo.store";
import {dummy} from "@/appplication/cqrs/command/ChangeOriginLink/dummy";
import ChangeLinkInfoCommand from "@/appplication/cqrs/command/ChangeOriginLink/ChangeOriginLinkCommand";
import LinkInfo from "@/domain/model/LinkInfo";
import {LinkType} from "@/domain/enums/LinkType";
import {ExceptionMsg} from "@/domain/enums/ExceptionMsg";
import {useRouter} from "vue-router";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const userInfoStore = useUserInfoStore()
const router = useRouter()
export const handleChangeLinkInfo = async (command: ChangeLinkInfoCommand) => {
    if (baseUrl === "dummy") {
        return Promise.resolve(dummy).then((result) => {
            return result;
        })
    } else {
        const response = await fetch(`${baseUrl}/change-origin-link-info`, {
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
            const originalLink = command.originLink
            const id = command.id
            const linkInfo = new LinkInfo(id,  null, null, originalLink, null, null)
            userInfoStore.changeLinkInfo(LinkType.ENABLED, linkInfo)
        })
    }

}