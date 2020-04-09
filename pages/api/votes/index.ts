import withErrorHandler from '@middlewares/withErrorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import Vote from './Vote.model';

export default withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    if (!req.body.state) {
      res.status(400);
    } else {
      console.log(req.headers);
      await Vote.create({ type: !!req.body.type, state: req.body.state });
    }
  }

  res.end();
});
