import { t } from 'elysia';

export interface IUpdateUserDto {
  email?: string;
  password?: string;
  uuid?: string;
}

export const UpdateUserDto = t.Object({
  email: t.Optional(t.String()),
  password: t.Optional(t.String()),
  uuid: t.Optional(t.String()),
});