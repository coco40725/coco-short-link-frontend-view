import {Command} from "@/application/cqrs/command/base/Command";

export interface CommandHandler<R, C extends Command<R>> {
    handle(command: C): R;
    getExceptionMessage(exceptionCode: string): string;
}
