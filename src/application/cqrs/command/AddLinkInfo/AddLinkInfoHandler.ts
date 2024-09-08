import AddLinkInfoCommand from "@/application/cqrs/command/AddLinkInfo/AddLinkInfoCommand";
import {dummy} from "@/application/cqrs/command/AddLinkInfo/dummy";
import LinkInfo from "@/domain/model/LinkInfo";
import {useRouter} from "vue-router";
import {CommandHandler} from "@/application/cqrs/command/base/CommandHandler";
import {CommandFactory} from "@/application/cqrs/command/base/CommandFactory";
import {useUserInfoStore} from "@/domain/store/UserInfo.store";
import {inject} from "vue";
import {userInfoStore} from "@/main";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const router = useRouter()


export class AddLinkInfoHandler implements CommandHandler<Promise<LinkInfo>, AddLinkInfoCommand> {
    static {
        CommandFactory.registerCommandHandler(new AddLinkInfoHandler(), AddLinkInfoCommand.name)
    }

    async handle(command: AddLinkInfoCommand): Promise<LinkInfo> {
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
                    return response.json().then((json) => {
                        const data: LinkInfo = json
                        return data;
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
    SHORT_LINK_INVALID= "無效短網址",
    ORIGINAL_LINK_INVALID = "無效原始網址",
    EXPIRATION_DATE_INVALID = "無效過期時間",
    SHORT_LINK_EXIST = "短網址已存在",
    TOKEN_INVALID = "使用者驗證失敗",
    UNKNOWN_ERROR = "非預期錯誤",
}