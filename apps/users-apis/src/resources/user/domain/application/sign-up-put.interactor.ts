import { Injectable } from '@nestjs/common';

import { SignUpPutUseCase } from '../../use-cases/sign-up-put.use-case';
import { SignUpPutRequestDto } from '../../use-cases/sign-up-put-request.dto';
import { SignUpPutResponseDto } from '../../use-cases/sign-up-put-response.dto';

@Injectable()
export class SignUpPutInteractor extends SignUpPutUseCase {
  async handle({ body }: SignUpPutRequestDto): Promise<SignUpPutResponseDto> {
    return {
      status: 201,
      body: {
        id: 1,
        email: body.email,
      },
    };
  }
}
