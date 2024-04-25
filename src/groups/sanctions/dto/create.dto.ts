import { t } from 'elysia';

export const CreateSanctionDto = t.Object({
  target_uuid: t.String(),
  agent_uuid: t.Optional(t.String()),
  type: t.String(),
  reason: t.String(),
  created_at: t.Date(),
  expires_at: t.Optional(t.Date()),
});
