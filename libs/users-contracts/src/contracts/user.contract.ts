import { initContract } from '@ts-rest/core';

import {
  SignedUserDto,
  SignInUserDto,
  SignUpUserDto,
  UserDto,
  VerifyUserDto,
} from '../dtos/user.dto';

const c = initContract();

export const UserContract = c.router({
  signIn: {
    method: 'POST',
    path: '/sign-in',
    responses: {
      201: SignedUserDto,
    },
    body: SignInUserDto,
  },
  signUp: {
    method: 'POST',
    path: '/sign-up',
    responses: {
      201: UserDto,
    },
    body: SignUpUserDto,
  },
  verify: {
    method: 'POST',
    path: '/verify',
    responses: {
      201: UserDto,
    },
    body: VerifyUserDto,
  },
});
