import {useRouter} from "vue-router";
import {CommandHandler} from "@/appplication/cqrs/command/base/CommandHandler";
import {LogoutCommand} from "@/appplication/cqrs/command/Logout/LogoutCommand";
import {CommandFactory} from "@/appplication/cqrs/command/base/CommandFactory";
import {userInfoStore} from "@/main";

const baseUrl = import.meta.env.VITE_USER_API_BASE_URL;
const router = useRouter();

export class LogoutHandler implements CommandHandler<Promise<boolean>, LogoutCommand> {
    static {
        CommandFactory.registerCommandHandler(new LogoutHandler(), LogoutCommand.name)
    }

    async handle(command: LogoutCommand): Promise<boolean> {
        if (baseUrl === "dummy") {
            return Promise.resolve().then(() => {
                return true
            })
        } else {
            const response = await fetch(`${baseUrl}/user/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });

            try {
                if (response.status === 500) {
                    return Promise.reject(new Error("SERVER_ERROR"));

                } else {
                    userInfoStore.logout()
                    return true
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

    UNKNOWN_ERROR = "非預期錯誤",
}