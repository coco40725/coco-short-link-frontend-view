import DateUtils from "@/infra/Utils/DateUtils";
import moment from "moment";
import {EnabledLinkInfoCommand} from "@/appplication/cqrs/command/EnabledLinkInfo/EnabledLinkInfoCommand";
import {CommandValidator} from "@/appplication/cqrs/command/base/CommandValidator";
import {CommandFactory} from "@/appplication/cqrs/command/base/CommandFactory";
import {CommandValidateResult} from "@/appplication/cqrs/command/base/CommandValidateResult";

export class EnabledLinkInfoValidator implements CommandValidator<EnabledLinkInfoCommand> {
    static {
        CommandFactory.registerCommandValidator(new EnabledLinkInfoValidator(), EnabledLinkInfoCommand.name)
    }


    validate(command: EnabledLinkInfoCommand): CommandValidateResult {
        const {id, expireUTCDate} = command;

        let isValid = true;
        let errorCode: ValidateMsgString[] = [];

        // rule: id should not be null and should be a valid ObjectId
        if (!id) {
            isValid = false;
            errorCode.push("SHORT_LINK_INVALID");
        }

        // rule: expireDate should be null or after now
        const today = new Date()
        const expireLocalDate = moment(expireUTCDate).local().toDate();
        if (expireUTCDate != null && expireLocalDate < today) {
            isValid = false;
            errorCode.push('DATE_IS_EXPIRE');
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
    SHORT_LINK_INVALID = "無效短網址",
    DATE_IS_EXPIRE = "過期時間已過",
}