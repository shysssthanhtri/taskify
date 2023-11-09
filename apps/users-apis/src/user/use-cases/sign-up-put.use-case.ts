import { BaseRequestUseCase } from '../../app/use-cases/base-request.use-case';
import { SignUpPutRequestDto } from './sign-up-put-request.dto';
import { SignUpPutResponseDto } from './sign-up-put-response.dto';

export abstract class SignUpPutUseCase extends BaseRequestUseCase<
  SignUpPutRequestDto,
  SignUpPutResponseDto
> {}
