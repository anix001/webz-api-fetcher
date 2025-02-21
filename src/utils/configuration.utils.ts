import dotenv from 'dotenv';

//[Load environment from .env files]
dotenv.config();

interface Config{
    port:number,
    webzToken:string,
    databaseUrl:string,
    baseUrl:string,
    };

const config: Config = {
    port: parseInt(process.env.PORT as string) || 8000,
    webzToken: process.env.WEBZ_TOKEN as string,
    databaseUrl: process.env.DATABASE_URL as string,
    baseUrl:process.env.BASE_URL as string
};

export default config;