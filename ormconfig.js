module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/**/*.entity.js'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: true,
  migrations: ['dist/src/database/migrations/*.js'],
  cli: { migrationsDir: 'src/database/migrations/' },
};
