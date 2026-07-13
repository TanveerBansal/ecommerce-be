import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema/index";
import { env } from "@/env";

// connection string
const connectionString = env.DATABASE_URL;

// Create connection
const client = postgres(connectionString);

// Create drizzle database instance
export const db = drizzle(client, { schema });
