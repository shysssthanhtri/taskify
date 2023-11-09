import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { ConfigService } from '../config/config.service';

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return this._createLocalOptions();
  }

  private _createLocalOptions(): TypeOrmModuleOptions {
    return {
      ...this._createBaseOptions(),
      autoLoadEntities: true,
    };
  }

  private _createBaseOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.getConfig('DATABASE_HOST'),
      port: +this.configService.getConfig('DATABASE_PORT'),
      database: this.configService.getConfig('DATABASE_DATABASE'),
      username: this.configService.getConfig('DATABASE_USERNAME'),
      password: this.configService.getConfig('DATABASE_PASSWORD'),
    };
  }
}
