import { Injectable } from '@nestjs/common';

import { ConfigSchema, TConfigSchema } from './config.schema';

@Injectable()
export class ConfigService {
  private config: TConfigSchema;

  constructor() {
    this.config = this._loadLocalConfig();
  }

  getConfig<Key extends keyof TConfigSchema>(key: Key): TConfigSchema[Key] {
    return this.config[key];
  }

  private _loadLocalConfig(): TConfigSchema {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config({
      path: `${__dirname}/.env`,
    });
    return ConfigSchema.parse({
      DATABASE_HOST: process.env.MYSQL_HOST,
      DATABASE_PORT: process.env.MYSQL_TCP_PORT,
      DATABASE_USERNAME: process.env.MYSQL_USER,
      DATABASE_PASSWORD: process.env.MYSQL_PASSWORD,
      DATABASE_DATABASE: process.env.MYSQL_DATABASE,
    });
  }
}
