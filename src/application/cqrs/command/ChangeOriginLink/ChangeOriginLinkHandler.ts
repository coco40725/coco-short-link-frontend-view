import {dummy} from "@/application/cqrs/command/ChangeOriginLink/dummy";
import LinkInfo from "@/domain/model/LinkInfo";
import {LinkType} from "@/domain/enums/LinkType";
import {useRouter} from "vue-router";
import {CommandHandler} from "@/application/cqrs/command/base/CommandHandler";
import ChangeOriginLinkCommand from "@/application/cqrs/command/ChangeOriginLink/ChangeOriginLinkCommand";
import {CommandFactory} from "@/application/cqrs/command/base/CommandFactory";
import {userInfoStore} from "@/main";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const router = useRouter()


export class ChangeOriginLinkHandler implements CommandHandler<Promise<void>, ChangeOriginLinkCommand> {
    static {
        CommandFactory.registerCommandHandler(new ChangeOriginLinkHandler(), ChangeOriginLinkCommand.name)
    }

    async handle(command: ChangeOriginLinkCommand) {
        if (baseUrl === "dummy") {
            return Promise.resolve(dummy).then((result) => {})
        } else {
            const response = await fetch(`${baseUrl}/change-origin-link-info`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(command)
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
                        const originalLink = command.originLink
                        const id = command.id
                        const linkInfo = new LinkInfo(id,  null, null, originalLink, null, null)
                        userInfoStore.changeLinkInfo(LinkType.ENABLED, linkInfo)
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
    ORIGIN_LINK_INVALID = "無效原始網址",
    UNKNOWN_ERROR = "非預期錯誤",
}