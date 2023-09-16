import { registerAs } from '@nestjs/config';

export const configDatabase = registerAs('database', () => ({
  ssl: process.env.STAGE === 'prod',
  extra: {
    ssl: process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null,
  },
  type: 'postgres',
  url: process.env.STAGE === 'prod' ? process.env.DB_URL : null,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  logging: process.env.STAGE === 'dev',
  synchronize: false,
  migrations: [`${__dirname}/../../migrations/**/*{.ts,.js}`],
  migrationsTableName: 'migrations',
}));
