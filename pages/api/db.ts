import * as mongoose from 'mongoose';

console.log('mongo uri', process.env.MONGO_URI);
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGO_URI || "", { useNewUrlParser: true, useUnifiedTopology: true })
}

export default {
  register: (model: string, schema: any) => {
    let mongooseModel = mongoose.connection.models[model];

    if (!mongooseModel) {
      mongooseModel = mongoose.model(model, schema);
    }

    return mongooseModel;
  },
  get: (model: string) => mongoose.connection.models[model],
};
