import CommandValidateResult from "@/appplication/cqrs/command/CommandValidateResult";
import LoginCommand from "@/appplication/cqrs/command/Login/LoginCommand";
import {ProviderType} from "@/domain/enums/ProviderType";

export function validateLogin(command: LoginCommand): CommandValidateResult {
    let isValid = true;
    let errorMessage = [];
    const email = command.email;
    const password = command.password;
    const idToken = command.idToken;
    const providerType = command.providerType;

    // rule 1: if ProviderType is WEB, then email and password must not be null
    if (providerType === ProviderType.WEB && (!email || !password)) {
        isValid = false;
        errorMessage.push('請輸入帳號密碼');
    }

    // rule 2: if ProviderType is GOOGLE, then idToken must not be null
    if (providerType === ProviderType.GOOGLE && !idToken) {
        isValid = false;
        errorMessage.push('Google 登入失敗，請稍後再試');
    }
    const result = new CommandValidateResult(isValid, errorMessage);
    return result;
}