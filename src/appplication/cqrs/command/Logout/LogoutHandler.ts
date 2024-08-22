import {useUserInfoStore} from "@/domain/store/UserInfo.store";
import {useRouter} from "vue-router";

const baseUrl = import.meta.env.VITE_USER_API_BASE_URL;
const userInfoStore = useUserInfoStore();
const router = useRouter();

export async function handleLogout() {
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

        if (!response.ok) {
            throw new Error("登出失敗，請稍後再試");
        } else {
            userInfoStore.logout()
            return true
        }
    }
}