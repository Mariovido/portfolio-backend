import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const configCors: CorsOptions = {
  origin: process.env.STAGE === 'prod' ? process.env.FRONTEND_URL : '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
  ],
  credentials: true,
  preflightContinue: false,
};
