import LinkStat from "@/domain/model/LinkStat";
import {Query} from "@/appplication/cqrs/query/base/Query";

export class GetUserLinkStatQuery implements Query<Promise<LinkStat>> {
    link: string = null;

    constructor(link: string) {
        this.link = link;
    }
}