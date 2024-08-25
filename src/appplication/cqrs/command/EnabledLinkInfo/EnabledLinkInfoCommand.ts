import {Command} from "@/appplication/cqrs/command/base/Command";

export class EnabledLinkInfoCommand implements Command<Promise<void>> {
    id: string;
    expireUTCDate: Date;
    constructor(id: string, expireUTCDate: Date) {
        this.id = id;
        this.expireUTCDate = expireUTCDate;
    }
}