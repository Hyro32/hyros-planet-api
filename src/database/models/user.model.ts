import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    uuid: { type: String, required: true, unique: true },
  },
  { versionKey: false },
);

export const UsersModel = model('Users', userSchema);
