import AddLinkInfoCommand from "@/appplication/cqrs/command/AddLinkInfo/AddLinkInfoCommand";
import LinkInfoSvc from "@/domain/service/LinkInfoSvc";
import {CommandValidator} from "@/appplication/cqrs/command/base/CommandValidator";
import {CommandFactory} from "@/appplication/cqrs/command/base/CommandFactory";
import {CommandValidateResult} from "@/appplication/cqrs/command/base/CommandValidateResult";

const linkInfoSvc = new LinkInfoSvc()

export class AddLinkInfoValidator implements CommandValidator<AddLinkInfoCommand> {
    static {
        CommandFactory.registerCommandValidator(new AddLinkInfoValidator(), AddLinkInfoCommand.name)
    }

    validate(command: AddLinkInfoCommand): CommandValidateResult {
        let isValid = true;
        let errorCode: ValidateMsgString[] = [];
        // rule 1: short link length must be less than 100 characters
        const shortLink = command.shortLink;
        if (shortLink && !linkInfoSvc.isShortLinkValid(shortLink)) {
            isValid = false;
            errorCode.push("SHORT_LINK_INVALID");
        }

        // rule 2: original link length must be less than 100 characters
        const originalLink = command.originalLink;
        if (!linkInfoSvc.isOriginalLinkValid(originalLink)) {
            isValid = false;
            errorCode.push('ORIGINAL_LINK_INVALID');
        }

        // rule 3: if expiration date is not null, check if date is after now
        const expirationDate = command.expirationDate;
        if (expirationDate && !linkInfoSvc.isExpirationDateValid(expirationDate)) {
            isValid = false;
            errorCode.push('EXPIRATION_DATE_INVALID');
        }

        const result = new CommandValidateResult(isValid, errorCode);
        return result;
    }

    getValidationMessage(validateCode: string): string {
        return ValidateCodeMsg[validateCode as ValidateMsgString]
    }
}


type ValidateMsgString = keyof typeof ValidateCodeMsg
export enum ValidateCodeMsg {
    SHORT_LINK_INVALID = "無效短網址",
    ORIGINAL_LINK_INVALID = "無效原始網址",
    EXPIRATION_DATE_INVALID = "無效過期時間",
}