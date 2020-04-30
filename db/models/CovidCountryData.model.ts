import * as mongoose from 'mongoose';

import db from '../db';

const { Schema } = mongoose;

const CovidCountryData = new Schema({
  country: String,
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

const model = db.register('CovidCountryData', CovidCountryData);

export default model;
