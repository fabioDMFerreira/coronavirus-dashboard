import withErrorHandler from '@middlewares/withErrorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

import Vote from './Vote.model';

export default withErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    if (!req.body.state) {
      res.status(400);
    } else {
      const ip = req.headers['x-forwarded-for'] || '';

      const vote = await Vote.findOne({ ip, state: req.body.state })

      if (!vote) {
        await Vote.create({ type: !!req.body.type, state: req.body.state, ip });
      }
    }
  }

  res.end();
});
