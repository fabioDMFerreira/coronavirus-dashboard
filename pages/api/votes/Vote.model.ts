import * as mongoose from 'mongoose';

import db from '../db';

const { Schema } = mongoose;

const voteSchema = new Schema({
  type: Boolean,
  createdAt: { type: Date, default: Date.now },
  state: Schema.Types.Mixed,
  ip: String
});

const model = db.register('Vote', voteSchema);

export default model;
