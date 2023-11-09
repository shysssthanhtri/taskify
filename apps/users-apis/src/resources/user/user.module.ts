import { Module } from '@nestjs/common';

import { SignUpPutInteractor } from './domain/application/sign-up-put.interactor';
import { SignUpPutUseCase } from './use-cases/sign-up-put.use-case';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: SignUpPutUseCase,
      useClass: SignUpPutInteractor,
    },
  ],
})
export class UserModule {}
