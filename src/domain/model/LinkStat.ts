export default class LinkStat{
    totalCount: number;
    shortLink: string;
    referCount: Map<string, number>
    ipCount: Map<string, number>
    userAgentCount: Map<string, number>
    createDate: Date;

    constructor(totalCount: number, shortLink: string, referCount: Map<string, number>, ipCount: Map<string, number>, userAgentCount: Map<string, number>, createDate: Date){
        this.totalCount = totalCount;
        this.shortLink = shortLink;
        this.referCount = referCount;
        this.ipCount = ipCount;
        this.userAgentCount = userAgentCount;
        this.createDate = createDate;
    }
}