import { InferSelectModel } from "drizzle-orm"
import { text, integer, pgTable, timestamp, serial } from "drizzle-orm/pg-core"

export const accountTypeEnum = ["email", "google"] as const

export const users = pgTable("user", {
	id: serial("id").primaryKey(),
	email: text("email").unique(),
	emailVerified: timestamp("email_verified"),
})

export const accounts = pgTable("accounts", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.unique()
		.notNull(),
	accountType: text("account_type", { enum: accountTypeEnum }).notNull(),
	googleId: text("google_id").unique(),
	password: text("password"),
	salt: text("salt"),
})

export const magicLinks = pgTable("magic_links", {
	id: serial("id").primaryKey(),
	email: text("email").notNull().unique(),
	token: text("token"),
	tokenExpiresAt: timestamp("token_expires_at").notNull(),
})

export const resetTokens = pgTable("reset_tokens", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.unique()
		.notNull(),
	token: text("token"),
	tokenExpiresAt: timestamp("token_expires_at").notNull(),
})

export const verifyEmailTokens = pgTable("verify_email_tokens", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.unique()
		.notNull(),
	token: text("token"),
	tokenExpiresAt: timestamp("token_expires_at").notNull(),
})

export const profiles = pgTable("profile", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.unique()
		.notNull(),
	displayName: text("display_name"),
	imageId: text("image_id"),
	image: text("image"),
	bio: text("bio").notNull().default(""),
})

export const sessions = pgTable("session", {
	id: text("id").primaryKey(),
	userId: integer("user_id")
		.references(() => users.id, {
			onDelete: "cascade",
		})
		.notNull(),
	expiresAt: timestamp("expires_at").notNull(),
})

export type User = InferSelectModel<typeof users>
export type Profile = InferSelectModel<typeof profiles>
export type Session = InferSelectModel<typeof sessions>
