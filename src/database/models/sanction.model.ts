import { Schema, model } from 'mongoose';

const sanctionSchema = new Schema({
  _id: { type: Number, unique: true },
  target_uuid: { type: String, required: true },
  agent_uuid: { type: String, required: false },
  type: { type: String, required: true },
  reason: { type: String, required: true },
  created_at: { type: Date, required: false, default: new Date() },
  expires_at: { type: Date, required: false },
});

export const SanctionModel = model('Sanctions', sanctionSchema);

sanctionSchema.pre('save', async function (next) {
  if (!this._id) {
    const count: number = await SanctionModel.countDocuments();
    this._id = count + 1;
  }
  next();
});
