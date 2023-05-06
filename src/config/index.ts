import { config } from "dotenv";

config({ path: process.env.NODE_ENV === "dev" ? `.env` : ".env.prod" });

export const { DB_HOST, DB_USER, DB_NAME, WEATHER_API, DB_PASS } = process.env;
