import * as mongoose from 'mongoose';

import db from '../db';

const { Schema } = mongoose;

const voteSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  dataType: Number,
  timeType: Number,
  resource: String,
  date: Date,
  total: Number,
  up: Number,
  down: Number,
});

const model = db.register('VotesResult', voteSchema);

export default model;
