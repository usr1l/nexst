// allows use of environmental variables
require('dotenv').config();

export const environment: string = process.env.NODE_ENV || 'development';
export const port: string = process.env.PORT || "5000";
export const key: string = process.env.KEY || '';
export const expiresIn: string = process.env.EXPIRES_IN || '604000';
export const mongoURI: string = process.env.DB_FILE || '';
