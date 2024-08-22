import AddLinkInfoCommand from "@/appplication/cqrs/command/AddLinkInfo/AddLinkInfoCommand";
import CommandValidateResult from "@/appplication/cqrs/command/CommandValidateResult";
import LinkInfoSvc from "@/domain/service/LinkInfoSvc";

const linkInfoSvc = new LinkInfoSvc()

export function validateAddLinkInfo(command: AddLinkInfoCommand): CommandValidateResult {
    let isValid = true;
    let errorMessage = [];
    // rule 1: short link length must be less than 100 characters
    const shortLink = command.shortLink;
    if (shortLink && !linkInfoSvc.isShortLinkValid(shortLink)) {
        isValid = false;
        errorMessage.push('不合法的短網址');
    }

    // rule 2: original link length must be less than 100 characters
    const originalLink = command.originalLink;
    if (!linkInfoSvc.isOriginalLinkValid(originalLink)) {
        isValid = false;
        errorMessage.push('不合法的原始網址');
    }

    // rule 3: if expiration date is not null, check if date is after now
    const expirationDate = command.expirationDate;
    if (expirationDate && !linkInfoSvc.isExpirationDateValid(expirationDate)) {
        isValid = false;
        errorMessage.push('不合法的過期時間');
    }

    const result = new CommandValidateResult(isValid, errorMessage);
    return result;
}