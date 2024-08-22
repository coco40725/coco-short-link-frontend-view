import CommandValidateResult from "@/appplication/cqrs/command/CommandValidateResult";
import DateUtils from "@/infra/Utils/DateUtils";
import moment from "moment";


export function validateEnabledLinkInfo(id: string, expireUTCDate: Date): CommandValidateResult {
    let isValid = true;
    let errorMessage = [];

    // rule: id should not be null and should be a valid ObjectId
    if (!id) {
        isValid = false;
        errorMessage.push('不存在的網址');
    }

    // rule: expireDate should be null or after now
    const today = new Date()
    const expireLocalDate = moment(expireUTCDate).local().toDate();
    if (expireUTCDate != null && expireLocalDate < today) {
        isValid = false;
        errorMessage.push('此網址已經過期');
    }


    const result = new CommandValidateResult(isValid, errorMessage);
    return result;
}