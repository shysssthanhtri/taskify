import { z } from 'zod';

import { UserEntity } from '../entities';

export const UserDto = z.object(UserEntity.shape);

export const SignInUserDto = UserDto.pick({ email: true }).extend({
  password: z.string(),
});
export const SignedUserDto = UserDto.extend({
  token: z.string(),
});

export const SignUpUserDto = UserDto.pick({ email: true });

export const VerifyUserDto = SignedUserDto.pick({ token: true });
