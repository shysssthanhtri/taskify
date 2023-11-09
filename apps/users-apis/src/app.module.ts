import { Module } from '@nestjs/common';

import { ConfigModule } from './core/config/config.module';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [UserModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
