import { DataSource, type DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { UrlsSchema } from '../../../modules/urls/infra/entities/urls.schema';
import { UsersSchema } from '../../../modules/users/infra/entities/users.schema';

const env = process.env.NODE_ENV || 'development';

export function ormconfig(): DataSourceOptions {
  if (env === 'test') {
    return {
      type: 'postgres',
      host: process.env.DB_HOST_TEST,
      port: parseInt(process.env.DB_PORT_TEST || '5433'),
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [UrlsSchema, UsersSchema],
      migrations: ['dist/migrations/*.js'],
      synchronize: true,
      ssl:
        process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      logging: false,
    };
  }
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [UrlsSchema, UsersSchema],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    logging: false,
  };
}

const datasource = new DataSource(ormconfig());
export default datasource;
