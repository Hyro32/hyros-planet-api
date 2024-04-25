import { Schema, model } from 'mongoose';
import { Locales, Ranks } from '../../common';

const playerSchema = new Schema({
  uuid: { type: String, required: true, unique: true },
  locale: {
    type: String,
    enum: Locales,
    required: true,
    default: Locales.en_US,
  },
  rank: { type: String, enum: Ranks, required: true, default: Ranks.DEFAULT },
  first_joined: { type: Date, required: true },
  last_joined: { type: Date, required: false },
});

export const PlayerModel = model('Players', playerSchema);
