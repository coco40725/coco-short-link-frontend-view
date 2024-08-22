import LinkInfo from "@/domain/model/LinkInfo";

export default class UserShortLinkInfo{
    userId: string
    enabledShortLinkInfo: Array<LinkInfo>
    disabledShortLinkInfo: Array<LinkInfo>

    constructor(userId: string, enabledShortLinkInfo: Array<LinkInfo>, disabledShortLinkInfo: Array<LinkInfo>) {
        this.userId = userId;
        this.enabledShortLinkInfo = enabledShortLinkInfo;
        this.disabledShortLinkInfo = disabledShortLinkInfo;
    }
}