import { Schema, model } from 'mongoose';

const sanctionSchema = new Schema(
  {
    target_uuid: { type: String, required: true },
    agent_uuid: { type: String, required: false },
    type: { type: String, required: true },
    reason: { type: String, required: true },
    created_at: { type: Date, required: false, default: new Date() },
    expires_at: { type: Date, required: false },
  },
  { versionKey: false },
);

export const SanctionModel = model('Sanctions', sanctionSchema);
