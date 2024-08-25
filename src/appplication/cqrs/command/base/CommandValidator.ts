import {Command} from "@/appplication/cqrs/command/base/Command";
import {CommandValidateResult} from "@/appplication/cqrs/command/base/CommandValidateResult";

export interface CommandValidator<C extends Command<any>> {
    validate(command: C): CommandValidateResult;
    getValidationMessage(validateCode: string): string;
}