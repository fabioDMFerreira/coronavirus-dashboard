import State from '@db/models/State.model';
import withErrorHandler from '@middlewares/withErrorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import hash from '@utils/hash';

export const stateHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    if (!req.body.state) {
      res.status(400);
    } else {
      const secret = hash(JSON.stringify(req.body.state));
      await State.findOneAndUpdate(
        { hash: secret },
        { state: req.body.state, createdAt: new Date() },
        { upsert: true },
      );

      res.write(secret);
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

export default withErrorHandler(stateHandler);
