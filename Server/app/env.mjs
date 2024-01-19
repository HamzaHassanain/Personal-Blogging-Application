import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const DB_URL = process.env.DB_URL;
export const ORIGIN_ALLOWED =
  process.env.ORIGIN_ALLOWED || "http://localhost:3000";
export const COOKIE_SECRET = process.env.ADMIN_COOKIE_SECRET;
export const COOKIE_EXP = Number(
  process.env.ADMIN_COOKIE_EXP || 3 * 60 * 60 * 1000
);

export const admin_name = process.env.ADMIN_NAME;
export const admin_password = process.env.ADMIN_PASSWORD;

export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;
