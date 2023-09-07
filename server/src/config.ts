import dotenv from "dotenv"
dotenv.config();


export const PORT:number = parseInt(process.env.PORT || "");

export const SICKRET_COOKIES: string = process.env.SICKRET_COOKIES || "";

export const MONGODB_URL: string = process.env.MONGODB_URL || "";

export const NAME_DB: string = process.env.NAME_DB || "";


if(!SICKRET_COOKIES) throw new Error("SICKRET_COOKIES is not exist")
if(!MONGODB_URL) throw new Error("MONGODB_URL is not exist")
if(!NAME_DB) throw new Error("NAME_DB is not exist")
