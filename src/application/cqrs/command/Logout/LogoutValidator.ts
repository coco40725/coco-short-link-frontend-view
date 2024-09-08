import {useCookies} from "vue3-cookies";
import {CommandValidator} from "@/application/cqrs/command/base/CommandValidator";
import {LogoutCommand} from "@/application/cqrs/command/Logout/LogoutCommand";
import {CommandFactory} from "@/application/cqrs/command/base/CommandFactory";
import {CommandValidateResult} from "@/application/cqrs/command/base/CommandValidateResult";

const useCookie = useCookies()

export class LogoutValidator implements CommandValidator<LogoutCommand> {
    static {
        CommandFactory.registerCommandValidator(new LogoutValidator(), LogoutCommand.name)
    }

    validate(command: LogoutCommand): CommandValidateResult {
        const cookies = useCookie.cookies
        const token = cookies.get("coco-token")
        let isValid = true;
        let errorCode: ValidateMsgString[] = [];

        if (!token) {
            isValid = false;
            errorCode.push("TOKEN_INVALID");
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
    TOKEN_INVALID = "不存在 token",
}