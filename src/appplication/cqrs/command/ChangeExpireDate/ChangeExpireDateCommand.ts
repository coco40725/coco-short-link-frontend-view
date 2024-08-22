export default class ChangeExpireDateCommand{
    id: string;
    expireDate: Date;

    constructor(id: string, expirationDate: Date) {
        this.id = id;
        this.expireDate = expirationDate;
    }
}