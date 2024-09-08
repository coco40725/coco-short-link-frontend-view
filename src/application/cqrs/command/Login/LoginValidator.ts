import {ProviderType} from "@/domain/enums/ProviderType";
import {CommandValidator} from "@/application/cqrs/command/base/CommandValidator";
import {CommandFactory} from "@/application/cqrs/command/base/CommandFactory";
import {LoginCommand} from "@/application/cqrs/command/Login/LoginCommand";
import {CommandValidateResult} from "@/application/cqrs/command/base/CommandValidateResult";


export class LoginValidator implements CommandValidator<LoginCommand> {
    static {
        CommandFactory.registerCommandValidator(new LoginValidator(), LoginCommand.name)
    }

    validate(command: LoginCommand): CommandValidateResult {
        let isValid = true;
        let errorCode: ValidateMsgString[] = [];
        const email = command.email;
        const password = command.password;
        const idToken = command.idToken;
        const providerType = command.providerType;

        // rule 1: if ProviderType is WEB, then email and password must not be null
        if (providerType === ProviderType.WEB && (!email || !password)) {
            isValid = false;
            errorCode.push('EMAIL_OR_PASSWORD_EMPTY');
        }

        // rule 2: if ProviderType is GOOGLE, then idToken must not be null
        if (providerType === ProviderType.GOOGLE && !idToken) {
            isValid = false;
            errorCode.push('GOOGLE_ID_TOKEN_INVALID');
        }
        const result = new CommandValidateResult(isValid, errorCode);
        return result;
    }

    getValidationMessage(validateCode: string): string {
        return ValidateCodeMsg[validateCode as ValidateMsgString]
    }
}


type ValidateMsgString = keyof typeof ValidateCodeMsg
enum ValidateCodeMsg {
    EMAIL_OR_PASSWORD_EMPTY = "請輸入帳號密碼",
    GOOGLE_ID_TOKEN_INVALID = "Google 登入失敗，請稍後再試",
}