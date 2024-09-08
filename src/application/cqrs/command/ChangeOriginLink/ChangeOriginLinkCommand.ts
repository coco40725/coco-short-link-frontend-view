import {Command} from "@/application/cqrs/command/base/Command";

export default class ChangeOriginLinkCommand implements Command<Promise<void>> {
    id: string
    originLink: string

    constructor(id: string, originLink: string) {
        this.id = id
        this.originLink = originLink
    }
}