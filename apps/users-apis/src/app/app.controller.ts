import { Controller, Get } from '@nestjs/common';
import { UserContract } from '@taskify/users-contracts';
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';

import { AppService } from './app.service';

const c = nestControllerContract(UserContract);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class AppController implements NestControllerInterface<typeof c> {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
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
  @TsRest(c.signUp)
  async signUp(@TsRestRequest() { body }: RequestShapes['signUp']) {
    return {
      status: 201 as const,
      body: {
        id: 1,
        email: body.email,
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
