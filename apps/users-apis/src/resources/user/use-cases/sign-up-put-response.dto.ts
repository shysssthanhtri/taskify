import { UserContract } from '@taskify/users-contracts';
import { nestControllerContract, NestResponseShapes } from '@ts-rest/nest';

const c = nestControllerContract(UserContract);
type ResponseShapes = NestResponseShapes<typeof c>;

export type SignUpPutResponseDto = ResponseShapes['signUp'];
