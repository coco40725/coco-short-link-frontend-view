import {dummy} from "@/application/cqrs/command/Login/dummy";
import {useCookies} from "vue3-cookies";
import User from "@/domain/model/User";
import {CommandHandler} from "@/application/cqrs/command/base/CommandHandler";
import {LoginCommand} from "@/application/cqrs/command/Login/LoginCommand";
import {CommandFactory} from "@/application/cqrs/command/base/CommandFactory";
import {userInfoStore} from "@/main";

const baseUrl = import.meta.env.VITE_USER_API_BASE_URL;

export class LoginHandler implements CommandHandler<Promise<User>, LoginCommand> {
    static {
        CommandFactory.registerCommandHandler(new LoginHandler(), LoginCommand.name)
    }

    async handle(command :  LoginCommand): Promise<User> {
        if (baseUrl === 'dummy') {
            return Promise.resolve(dummy).then((user) => {
                userInfoStore.login()
                return userInfoStore.user
            })
        } else {
            const response = await fetch(`${baseUrl}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(command),
            });


            try {
                if (response.status === 500) {
                    return Promise.reject(new Error("SERVER_ERROR"));

                } else if (response.status === 400) {
                    const message = await response.text() as ExceptionMsgString
                    return Promise.reject(new Error(message));

                } else {
                    return response.text().then(_ => {
                        userInfoStore.login()
                        return userInfoStore.user
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
    EMAIL_INVALID = "無效信箱",
    PASSWORD_INVALID = "無效密碼",
    GOOGLE_ID_TOKEN_INVALID = "Google 登入失敗，請稍後再試",
    UNKNOWN_ERROR = "非預期錯誤",
}