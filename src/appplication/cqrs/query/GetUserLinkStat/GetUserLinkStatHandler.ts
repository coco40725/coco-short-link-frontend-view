import LinkStat from "@/domain/model/LinkStat";
import {dummy} from "@/appplication/cqrs/query/GetUserLinkStat/dummy";
import {useRouter} from "vue-router";
import {GetUserLinkStatQuery} from "@/appplication/cqrs/query/GetUserLinkStat/GetUserLinkStatQuery";
import {QueryHandler} from "@/appplication/cqrs/query/base/QueryHandler";
import {QueryFactory} from "@/appplication/cqrs/query/base/QueryFactory";
import {userInfoStore} from "@/main";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const router = useRouter()

export class GetUserLinkStatHandler implements QueryHandler<Promise<LinkStat>, GetUserLinkStatQuery> {
    static {
        QueryFactory.registerQueryHandler(new GetUserLinkStatHandler(), GetUserLinkStatQuery.name)
    }
    async handle(query: GetUserLinkStatQuery): Promise<LinkStat> {
        const link = query.link
        if (baseUrl === "dummy") {
            return Promise.resolve(dummy).then((json) => {
                const data: LinkStat = JSON.parse(json);
                return data;
            })
        } else {
            const response = await fetch(`${baseUrl}/user/link-stat?shortLink=${link}`, {
                method: 'GET',
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
                    return response.json().then((json) => {
                        const data: LinkStat = json
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
    TOKEN_INVALID = "使用者驗證失敗",
    SHORT_LINK_INVALID = "無效短網址",
    UNKNOWN_ERROR = "非預期錯誤",
}