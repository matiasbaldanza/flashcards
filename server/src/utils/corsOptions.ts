import { Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Parse the allowed origins from the environment variable

const parseAllowedOrigins = (origins: string | undefined): string[] => {
  if (!origins) return [];
  return origins.split(',');
}

const devAllowedOrigins = parseAllowedOrigins(process.env.DEV_ALLOWED_ORIGINS);
const prodAllowedOrigins = parseAllowedOrigins(process.env.PROD_ALLOWED_ORIGINS);

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? prodAllowedOrigins
  : devAllowedOrigins;

// This function is used as the callback for the cors() middleware

type CorsCallback = (err: Error | null, options?: cors.CorsOptions) => void;

export default function corsOptions(
  req: Request,
  callback: CorsCallback
) {
  let corsOptions;
  let origin = req.header('Origin');
  let originIsAllowed = origin ? allowedOrigins.includes(origin) : true;

  if (originIsAllowed) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }

  // callback expects two parameters: error and options
  callback(null, corsOptions);
};