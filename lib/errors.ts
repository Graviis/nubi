
export class LoginWrongPasswordError extends Error {
    constructor() {
        super()
        this.message = "LoginWrongPasswordError"
    }
}


export class LoginWrongEmailError extends Error {
    constructor() {
        super()
        this.message = "LoginWrongEmailError"
    }
}

