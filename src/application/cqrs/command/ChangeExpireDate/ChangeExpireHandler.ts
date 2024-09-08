import ChangeExpireDateCommand from "@/application/cqrs/command/ChangeExpireDate/ChangeExpireDateCommand";
import {useUserInfoStore} from "@/domain/store/UserInfo.store";
import {dummy} from "@/application/cqrs/command/ChangeExpireDate/dummy";
import LinkInfo from "@/domain/model/LinkInfo";
import {useRouter} from "vue-router";
import {CommandHandler} from "@/application/cqrs/command/base/CommandHandler";
import {CommandFactory} from "@/application/cqrs/command/base/CommandFactory";
import {userInfoStore} from "@/main";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const router = useRouter()

export class ChangeExpireDateHandler implements CommandHandler<Promise<void>, ChangeExpireDateCommand> {
    static {
        CommandFactory.registerCommandHandler(new ChangeExpireDateHandler(), ChangeExpireDateCommand.name)
    }

    async handle(command: ChangeExpireDateCommand) {
        if (baseUrl === "dummy") {
            return Promise.resolve(dummy).then((result) => {})
        } else {
            const response = await fetch(`${baseUrl}/change-expire-date`, {
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
                        const id = command.id
                        const expireDate = command.expireDate
                        const type = command.type
                        const linkInfo = new LinkInfo(id,  null, null, null, expireDate, null)
                        userInfoStore.changeLinkInfo(command.type, linkInfo)
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