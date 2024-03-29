import * as mongoose from 'mongoose';

import db from '../db';

const { Schema } = mongoose;

const CovidDataSchema = new Schema({
  country: String,
  region: String,
  date: String,
  time: Date,
  source: String,
  apiResult: Schema.Types.Mixed,
  totalCases: Number,
  newCases: Number,
  totalDeaths: Number,
  newDeaths: Number,
  createdAt: { type: Date, default: Date.now },
});

const model = db.register('CovidCountryRegionData', CovidDataSchema);

export default model;
