import db from '../db';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stateSchema = new Schema({
  hash: String,
  state: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

let model = db.register('State', stateSchema)

export default model;
