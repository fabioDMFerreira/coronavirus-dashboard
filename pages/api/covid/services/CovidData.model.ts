import * as mongoose from 'mongoose';

import db from '../../db';

const { Schema } = mongoose;

const CovidDataSchema = new Schema({
  date: String,
  createdAt: { type: Date, default: Date.now },
});

const model = db.register('CovidData', CovidDataSchema);

export default model;
