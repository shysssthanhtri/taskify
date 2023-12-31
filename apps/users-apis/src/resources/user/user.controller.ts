import { Controller } from '@nestjs/common';
import { UserContract } from '@taskify/users-contracts';
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';

import { SignUpPutUseCase } from './use-cases/sign-up-put.use-case';

const c = nestControllerContract(UserContract);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class UserController implements NestControllerInterface<typeof c> {
  constructor(private readonly signUpPutUseCase: SignUpPutUseCase) {}

  @TsRest(c.signUp)
  async signUp(@TsRestRequest() request: RequestShapes['signUp']) {
    return this.signUpPutUseCase.handle(request);
  }

  @TsRest(c.signIn)
  async signIn(@TsRestRequest() { body }: RequestShapes['signIn']) {
    return {
      status: 201 as const,
      body: {
        id: 1,
        email: body.email,
        token: '',
      },
    };
  }

  @TsRest(c.verify)
  async verify(@TsRestRequest() { body }: RequestShapes['verify']) {
    console.log({ body });
    return {
      status: 201 as const,
      body: {
        id: 1,
        email: '',
      },
    };
  }
}
