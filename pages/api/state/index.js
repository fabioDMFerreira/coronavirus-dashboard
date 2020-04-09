import State from './State.model';

const crypto = require('crypto');

export default async (req, res) => {
  if (req.method === 'POST') {
    if (!req.body.state) {
      res.status(400);
    } else {
      const hash = crypto.createHash('md5').update(JSON.stringify(req.body.state)).digest('hex');

      await State.findOneAndUpdate(
        { hash },
        { state: req.body.state, createdAt: new Date() },
        { upsert: true }
      );

      res.write(hash);
    }
  } else if (req.method === 'GET') {
    if (!req.query.state) {
      res.status(404);
    } else {
      const document = await State.findOne({ hash: req.query.state });

      if (!document) {
        res.status(404);
      } else {
        res.json(document.state);
      }
    }
  }

  res.end();
}
