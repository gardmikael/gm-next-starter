import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
})

export const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>
