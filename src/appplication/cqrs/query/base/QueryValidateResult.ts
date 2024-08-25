export class QueryValidateResult {
    isValid: boolean;
    errorCode: string[];

    constructor(isValid: boolean, errorCode: string[]) {
        this.isValid = isValid;
        this.errorCode = errorCode;
    }
}

