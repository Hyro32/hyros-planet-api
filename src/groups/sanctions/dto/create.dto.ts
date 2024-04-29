import { t } from 'elysia';

export interface ICreateSanctionDto {
  target_uuid: string;
  agent_uuid?: string;
  type: string;
  reason: string;
  created_at: Date;
  expires_at?: Date;
}

export const CreateSanctionDto = t.Object({
  target_uuid: t.String(),
  agent_uuid: t.Optional(t.String()),
  type: t.String(),
  reason: t.String(),
  created_at: t.Date(),
  expires_at: t.Optional(t.Date()),
});
