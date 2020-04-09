import db from '../db';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const stateSchema = new Schema({
  hash: String,
  state: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

const model = db.register('State', stateSchema);

export default model;
