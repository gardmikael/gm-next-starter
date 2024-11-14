export enum ColorMode {
	Light = "light",
	Dark = "dark",
}

export type UserProfile = {
	id: UserId
	name: string | null
	image: string | null
}

export type UserId = number

export type UserSession = {
	id: UserId
}

export type GoogleUser = {
	sub: string
	name: string
	given_name: string
	family_name: string
	picture: string
	email: string
	email_verified: boolean
	locale: string
}

export enum Intent {
	Server = "server",
	Client = "client",
}

export type IntentType = "server" | "client"
