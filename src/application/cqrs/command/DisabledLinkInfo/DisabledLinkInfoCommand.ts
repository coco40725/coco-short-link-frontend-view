import {Command} from "@/application/cqrs/command/base/Command";

export class DisabledLinkInfoCommand implements Command<Promise<void>> {
    id: string

    constructor(id: string) {
        this.id = id
    }
}