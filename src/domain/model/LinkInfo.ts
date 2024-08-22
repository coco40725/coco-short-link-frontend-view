export default class LinkInfo{
    id: string;
    shortLink: string;
    userId: string;
    originalLink: string;
    expirationDate: Date;
    createDate: Date;

    constructor(id: string, shortLink: string, userId: string, originalLink: string, expirationDate: Date, createDate: Date) {
        this.id = id;
        this.shortLink = shortLink;
        this.userId = userId;
        this.originalLink = originalLink;
        this.expirationDate = expirationDate;
        this.createDate = createDate
    }

}