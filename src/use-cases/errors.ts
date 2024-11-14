export class PublicError extends Error {
	constructor(message: string) {
		super(message)
	}
}

export class AuthenticationError extends PublicError {
	constructor() {
		super("Du må være innlogget for å se dette innholdet")
		this.name = "AuthenticationError"
	}
}

export class EmailInUseError extends PublicError {
	constructor() {
		super("Eposten er allerede i bruk")
		this.name = "EmailInUseError"
	}
}

export class NotFoundError extends PublicError {
	constructor() {
		super("Kilede ikke funnet")
		this.name = "NotFoundError"
	}
}

export class TokenNotFoundError extends PublicError {
	constructor() {
		super("Token ikke funnet")
		this.name = "TokenNotFoundError"
	}
}
export class TokenExpiredError extends PublicError {
	constructor() {
		super("Token har utløpt")
		this.name = "TokenExpiredError"
	}
}

export class LoginError extends PublicError {
	constructor() {
		super("Ugyldig epost eller passord")
		this.name = "LoginError"
	}
}
