import withErrorHandler from '@middlewares/withErrorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import Subscription from './Subscription.model';

export default withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    if (!req.body.email) {
      res.status(400);
    } else {
      await Subscription.findOneAndUpdate(
        { email: req.body.email },
        { createdAt: new Date() },
        { upsert: true },
      );
    }
  }

  res.end();
});