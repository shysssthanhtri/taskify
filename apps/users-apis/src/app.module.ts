import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
