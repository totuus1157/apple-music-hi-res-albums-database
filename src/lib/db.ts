import { neon } from "@neondatabase/serverless";

let sqlInstance: ReturnType<typeof neon> | null = null;

export function getSql() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("DATABASE_URL is not defined");
  }

  if (!sqlInstance) {
    sqlInstance = neon(url);
  }

  return sqlInstance;
}
