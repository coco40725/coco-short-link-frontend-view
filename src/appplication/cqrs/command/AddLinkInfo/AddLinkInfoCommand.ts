
export default class AddLinkInfoCommand {
     shortLink: string = null;
     originalLink: string = null;
     expirationDate: Date = null;

    constructor(shortLink: string, originalLink: string, expirationDate: Date) {
        this.shortLink = shortLink;
        this.originalLink = originalLink;
        this.expirationDate = expirationDate;
    }

}