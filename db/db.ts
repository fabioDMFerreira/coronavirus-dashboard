import mongoose from 'mongoose';


export default {
  connect: function () {
    if (!mongoose.connection || mongoose.connection.readyState === 0) {
      mongoose.connect(process.env.MONGO_URI || "", { useNewUrlParser: true, useUnifiedTopology: true })
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: function (model: string, schema: any) {
    this.connect();

    let mongooseModel = mongoose.connection.models[model];

    if (!mongooseModel) {
      mongooseModel = mongoose.model(model, schema);
    }

    return mongooseModel;
  },
  get: (model: string) => mongoose.connection.models[model],
};
