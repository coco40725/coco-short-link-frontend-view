import LoginCommand from "@/appplication/cqrs/command/Login/LoginCommand";
import {dummy} from "@/appplication/cqrs/command/Login/dummy";
import {useCookies} from "vue3-cookies";
import {useUserInfoStore} from "@/domain/store/UserInfo.store";

const baseUrl = import.meta.env.VITE_USER_API_BASE_URL;
const userInfoStore = useUserInfoStore();

export async function handleLogin(command: LoginCommand) {
    if (baseUrl === 'dummy') {
        return Promise.resolve(dummy).then((user) => {
            userInfoStore.login()
            return user
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
        if (!response.ok) {
            throw new Error("登入失敗，請稍後再試");
        }
        return response.text().then(_ => {
            userInfoStore.login()
            return userInfoStore.user
        })
    }
}


