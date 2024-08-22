export default class CommandValidateResult {
    private _isValid: boolean = true;
    private _errorMessage: Array<string> = null;

    constructor(isValid: boolean, errorMessage: Array<string>) {
        this._isValid = isValid;
        this._errorMessage = errorMessage;
    }
    get isValid(): boolean {
        return this._isValid;
    }
    get errorMessage(): Array<string> {
        return this._errorMessage;
    }
}