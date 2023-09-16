import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({
  path: `${__dirname}/../.env.stage.${
    process.env.STAGE ? process.env.STAGE : 'dev'
  }`,
});

const configService = new ConfigService();

const isProduction = configService.get('STAGE') === 'prod';

export default new DataSource({
  ssl: isProduction,
  extra: {
    ssl: isProduction ? { rejectUnauthorized: false } : null,
  },
  type: 'postgres',
  url: isProduction ? configService.get('DB_URL') : null,
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  logging: !isProduction,
  synchronize: false,
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  migrationsTableName: 'migrations',
});
