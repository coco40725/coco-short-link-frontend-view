const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export default class LinkInfoSvc {

    isShortLinkValid(shortLink: string): boolean {
        let isValid = true;

        // rule 1: short link should only contain 0-9, a-z, A-Z, -, _
        const removeDomainShortLink = shortLink.replace(`${baseUrl}/`, "")
        const shortLinkRegex = /^[0-9a-zA-Z-_]+$/;
        if (!shortLinkRegex.test(removeDomainShortLink)) {
            isValid = false;
        }

        console.log(removeDomainShortLink)
        // rule 2: short link should not exceed 20 characters
        if (removeDomainShortLink.length > 20) {
            isValid = false;
        }

        return isValid;

    }

    isOriginalLinkValid(originalLink: string): boolean {
        let isValid =  true;

        // rule 1: original link should be a valid URL
        if (!this._isUrlValid(originalLink)) {
            isValid = false;
        }

        // rule 2: original link should not exceed 500  characters
        if (originalLink.length > 500) {
            isValid = false;
        }


        return isValid;

    }

    isExpirationDateValid(expirationDate: Date): boolean {
        // rule 3: if expiration date is not null, check if date is after now
        let isValid =  true;

        if ( expirationDate < new Date()) {
            isValid = false;
        }

        return isValid;

    }

    _isUrlValid(url: string): boolean{
        try {
            new URL(url);
            return true;
        } catch (err) {
            return false;
        }
    }
}