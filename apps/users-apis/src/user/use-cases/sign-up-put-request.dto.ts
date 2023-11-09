import { UserContract } from '@taskify/users-contracts';
import { nestControllerContract, NestRequestShapes } from '@ts-rest/nest';

const c = nestControllerContract(UserContract);
type RequestShapes = NestRequestShapes<typeof c>;

export type SignUpPutRequestDto = RequestShapes['signUp'];
