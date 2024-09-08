import {LinkType} from "@/domain/enums/LinkType";
import {dummy} from "@/application/cqrs/command/EnabledLinkInfo/dummy";
import {useRouter} from "vue-router";
import {EnabledLinkInfoCommand} from "@/application/cqrs/command/EnabledLinkInfo/EnabledLinkInfoCommand";
import {CommandHandler} from "@/application/cqrs/command/base/CommandHandler";
import {CommandFactory} from "@/application/cqrs/command/base/CommandFactory";
import {userInfoStore} from "@/main";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const router = useRouter()


export class EnabledLinkInfoHandler implements CommandHandler<Promise<void>, EnabledLinkInfoCommand> {
    static {
        CommandFactory.registerCommandHandler(new EnabledLinkInfoHandler(), EnabledLinkInfoCommand.name)
    }


    async handle(command: EnabledLinkInfoCommand): Promise<void> {
        const id = command.id
        if (baseUrl === "dummy") {
            return Promise.resolve(dummy).then((json) => {})
        } else {
            const linkInfo = userInfoStore.getLinkInfo(id, LinkType.DISABLED)
            const response = await fetch(`${baseUrl}/enable-link-info?id=${id}`, {
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
                    return response.text().then((result) => {
                        userInfoStore.removeLinkInfo(id, LinkType.DISABLED)
                        userInfoStore.addLinkInfo(linkInfo, LinkType.ENABLED)
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
    SHORT_LINK_EXPIRED = "短網址已過期",
    UNKNOWN_ERROR = "非預期錯誤",
}