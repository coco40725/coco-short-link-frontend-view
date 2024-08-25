import UserShortLinkInfo from "@/domain/model/UserShortLinkInfo";
import {Query} from "@/appplication/cqrs/query/base/Query";

export class GetUserShortLinkQuery implements Query<UserShortLinkInfo> {}