import {Command} from "@/application/cqrs/command/base/Command";

export default class ChangeExpireDateCommand implements Command<Promise<void>>{
    id: string;
    expireDate: Date;
    type: string;

    constructor(id: string, expirationDate: Date, type: string) {
        this.id = id;
        this.expireDate = expirationDate;
        this.type = type;
    }
}