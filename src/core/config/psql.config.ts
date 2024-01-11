import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PSQL_HOST,
  port: +process.env.PSQL_PORT,
  username: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  database: process.env.PSQL_DATABASE,
  schema: process.env.PSQL_SCHEMA || 'public',
  entities: ['dist/**/*.entity{.ts,.js}'],
  subscribers: ['dist/**/*.subscriber{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: ['dist/**/migration/*.js'],
  synchronize: false,
  logging: true,
});
AppDataSource.initialize();
export default AppDataSource;
