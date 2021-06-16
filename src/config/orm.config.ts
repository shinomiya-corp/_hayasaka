import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

export default registerAs(
  'typeOrmConfig',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    logging: true,
    migrations: ['dist/src/database/migrations/*.js'],
    cli: { migrationsDir: 'src/database/migrations/' },
  }),
);
