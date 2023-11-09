import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from './core/config/config.module';
import { TypeormConfigService } from './core/typeorm/typeorm-config.service';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeormConfigService,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
