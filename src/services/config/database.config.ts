import { registerAs } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { DATABASE } from './constants';

export default registerAs(
  DATABASE,
  (): MongooseModuleOptions => ({
    uri: process.env.DB_URI,
    dbName: process.env.DB_NAME || 'test',
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
  }),
);
