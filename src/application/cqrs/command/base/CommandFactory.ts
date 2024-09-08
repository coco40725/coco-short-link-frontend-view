import {CommandHandler} from "@/application/cqrs/command/base/CommandHandler";
import {Command} from "@/application/cqrs/command/base/Command";
import {CommandValidator} from "@/application/cqrs/command/base/CommandValidator";

export class CommandFactory {

    private static CommandHandlerMap = new Map<string, CommandHandler<any, Command<any>>>()
    private static CommandValidatorMap = new Map<string, CommandValidator<any>>()

    static registerCommandHandler<R> (handler: CommandHandler<R, Command<R>>, commandName: string) {
        CommandFactory.CommandHandlerMap.set(commandName, handler)
    }

    static registerCommandValidator<R> (validator: CommandValidator<R>, commandName: string) {
        CommandFactory.CommandValidatorMap.set(commandName, validator)
    }

    getCommandHandler<R>(command: Command<R>): CommandHandler<any, Command<any>>{
        const commandName = command.constructor.name
        return CommandFactory.CommandHandlerMap.get(commandName)

    }
    getCommandValidator<R>(command: Command<R>): CommandValidator<any> {
        const commandName = command.constructor.name
        return CommandFactory.CommandValidatorMap.get(commandName)
    }
}

