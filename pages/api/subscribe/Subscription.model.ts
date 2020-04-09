import db from '../db';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  email: String,
  createdAt: { type: Date, default: Date.now },
});

const model = db.register('Subscription', subscriptionSchema);

export default model;
