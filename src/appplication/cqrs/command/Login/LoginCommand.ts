import {ProviderType} from "@/domain/enums/ProviderType";

export default class LoginCommand {
    idToken: string = null;
    email: string = null;
    password: string = null;
    providerType: ProviderType = null;

    constructor(email: string, password: string, type: ProviderType, idToken: string) {
        this.email = email;
        this.password = password;
        this.providerType = type;
        this.idToken = idToken;
    }
}