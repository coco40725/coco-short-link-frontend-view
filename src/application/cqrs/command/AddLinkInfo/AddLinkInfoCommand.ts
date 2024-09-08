import LinkInfo from "@/domain/model/LinkInfo";
import {Command} from "@/application/cqrs/command/base/Command";

export default class AddLinkInfoCommand implements Command<Promise<LinkInfo>> {
     shortLink: string = null;
     originalLink: string = null;
     expirationDate: Date = null;

    constructor(shortLink: string, originalLink: string, expirationDate: Date) {
        this.shortLink = shortLink;
        this.originalLink = originalLink;
        this.expirationDate = expirationDate;
    }

}