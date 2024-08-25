import {Command} from "@/appplication/cqrs/command/base/Command";

export class LogoutCommand implements Command<Promise<Boolean>> {
    constructor() {
    }
}