import {Command} from "@/application/cqrs/command/base/Command";

export class LogoutCommand implements Command<Promise<Boolean>> {
    constructor() {
    }
}