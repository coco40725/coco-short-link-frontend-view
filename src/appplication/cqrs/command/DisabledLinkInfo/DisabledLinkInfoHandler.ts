import {dummy} from "@/appplication/cqrs/command/DisabledLinkInfo/dummy";
import {LinkType} from "@/domain/enums/LinkType";
import {useRouter} from "vue-router";
import {CommandHandler} from "@/appplication/cqrs/command/base/CommandHandler";
import {DisabledLinkInfoCommand} from "@/appplication/cqrs/command/DisabledLinkInfo/DisabledLinkInfoCommand";
import {CommandFactory} from "@/appplication/cqrs/command/base/CommandFactory";
import {userInfoStore} from "@/main";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const router = useRouter()


export class DisabledLinkInfoHandler implements CommandHandler<Promise<void>, DisabledLinkInfoCommand> {
    static {
        CommandFactory.registerCommandHandler(new DisabledLinkInfoHandler(), DisabledLinkInfoCommand.name)
    }

    async handle(command: DisabledLinkInfoCommand) {
        const id = command.id
        if (baseUrl === "dummy") {
            return Promise.resolve(dummy).then((json) => {})

        } else {
            const linkInfo = userInfoStore.getLinkInfo(id, LinkType.ENABLED)
            const response = await fetch(`${baseUrl}/disable-link-info?id=${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });


            try {
                if (response.status === 500) {
                    return Promise.reject(new Error("SERVER_ERROR"));

                } else if (response.status === 400) {
                    const message = await response.text() as ExceptionMsgString
                    if (message === "TOKEN_INVALID") {
                        // 直接登出
                        userInfoStore.logout()
                        await router.push({name: 'Login'})
                    } else {
                        return Promise.reject(new Error(message));
                    }

                } else {
                    return response.json().then((result) => {
                        userInfoStore.removeLinkInfo(id, LinkType.ENABLED)
                        userInfoStore.addLinkInfo(linkInfo, LinkType.DISABLED)
                    })
                }
            } catch (e) {
                throw new Error("UNKNOWN_ERROR");
            }
        }
    }

    getExceptionMessage(exceptionCode: string): string {
        return ExceptionCodeMsg[exceptionCode as ExceptionMsgString]
    }

}

type ExceptionMsgString = keyof typeof ExceptionCodeMsg
enum ExceptionCodeMsg {
    SERVER_ERROR = "伺服器錯誤",
    ID_INVALID = "無效ID",
    TOKEN_INVALID = "使用者驗證失敗",
    UNKNOWN_ERROR = "非預期錯誤",
}