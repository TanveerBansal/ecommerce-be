import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index.js";
import { env } from "../config/env.js";

// Create connection
const client = postgres(env.DATABASE_URL, {
    max: 10,
    idle_timeout: 20, 
    connect_timeout: 10,
});

// Create drizzle database instance
export const db = drizzle(client, { schema });

export async function checkDatabaseConnection(): Promise<void> {
  try {
    await client`SELECT 1`;
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
}

export async function closeDatabaseConnection(): Promise<void> {
  await client.end();
}

export type Database = typeof db; 
