import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 4000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DB_CONFING = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'abc123**',
    database: process.env.DB_NAME || 'bd_combat',
    port: process.env.DB_PORT || 3307
};
export const TOKEN = process.env.TOKEN || 'e2a366fb-aa7e-11ee-9911-0242ac110002';
