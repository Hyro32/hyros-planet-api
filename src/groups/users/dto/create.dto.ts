import { t } from 'elysia';

export interface ICreateUserDto {
  id?: string;
  email: string;
  password: string;
  uuid: string;
}

export const CreateUserDto = t.Object({
  id: t.Optional(t.String()),
  email: t.String(),
  password: t.String(),
  uuid: t.String(),
});
