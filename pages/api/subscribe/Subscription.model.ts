import db from '../db';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subscriptionSchema = new Schema({
  email: String,
  createdAt: { type: Date, default: Date.now }
});

let model = db.register('Subscription', subscriptionSchema)

export default model;
