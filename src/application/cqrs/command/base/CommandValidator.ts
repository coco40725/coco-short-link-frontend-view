import {Command} from "@/application/cqrs/command/base/Command";
import {CommandValidateResult} from "@/application/cqrs/command/base/CommandValidateResult";

export interface CommandValidator<C extends Command<any>> {
    validate(command: C): CommandValidateResult;
    getValidationMessage(validateCode: string): string;
}