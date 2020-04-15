import * as mongoose from 'mongoose';

import db from '../db';

const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  email: String,
  createdAt: { type: Date, default: Date.now },
});

const model = db.register('Subscription', subscriptionSchema);

export default model;
