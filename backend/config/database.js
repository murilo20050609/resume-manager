import mssql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();
const config = {
    server: process.env.SERVER,
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    options: {
        trustServerCertificate: true
    }
};

export const poolPromise = mssql.connect(config);