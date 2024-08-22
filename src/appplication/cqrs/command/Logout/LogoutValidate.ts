import {useCookies} from "vue3-cookies";
import CommandValidateResult from "@/appplication/cqrs/command/CommandValidateResult";

const useCookie = useCookies()
export function validateLogout() {
    const cookies = useCookie.cookies
    const token = cookies.get("coco-token")
    let isValid = true;
    let errorMessage = [];

    if (!token) {
        isValid = false;
        errorMessage.push('不存在 token');
    }

    const result = new CommandValidateResult(isValid, errorMessage);
    return result;
}