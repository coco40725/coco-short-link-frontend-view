import {Command} from "@/application/cqrs/command/base/Command";

export class EnabledLinkInfoCommand implements Command<Promise<void>> {
    id: string;
    expireUTCDate: Date;
    constructor(id: string, expireUTCDate: Date) {
        this.id = id;
        this.expireUTCDate = expireUTCDate;
    }
}