export default class ChangeOriginLinkCommand {
    id: string
    originLink: string

    constructor(id: string, originLink: string){
        this.id = id
        this.originLink = originLink
    }
}