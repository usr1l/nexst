require('dotenv').config();

export const environment: string = process.env.NODE_ENV || 'development';
export const port: string = process.env.PORT || "5000";
export const dbFile: string = process.env.DB_FILE || '';
