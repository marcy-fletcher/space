export class CredentialsCheckError extends Error {
    public usernameUnavailable: boolean;
    public emailUnavailable: boolean;

    constructor(usernameUnavailable: boolean = false, emailUnavailable: boolean = false) {
        super();
        this.usernameUnavailable = usernameUnavailable;
        this.emailUnavailable = emailUnavailable;
    }
}

export default CredentialsCheckError;
