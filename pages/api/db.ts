var mongoose = require('mongoose');

if (mongoose.connection.readyState === 0) {
  mongoose.connect('mongodb://root:password@localhost:27017/coronavirus', { useNewUrlParser: true, useUnifiedTopology: true });
}

export default {
  register: (model: string, schema: any) => {
    let mongooseModel = mongoose.connection.models[model];

    if (!mongooseModel) {
      mongooseModel = mongoose.model(model, schema);
    }

    return mongooseModel;
  },
  get: (model: string) => {
    return mongoose.connection.models[model];
  }
}
