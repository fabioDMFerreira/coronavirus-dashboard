import Vote from '@db/models/Vote.model';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    if (!req.body.state) {
      res.status(404);
    } else {
      const ip = req.headers['x-forwarded-for'] || '';

      const vote = await Vote.findOne({ ip, state: req.body.state })

      if (!vote) {
        await Vote.create({ type: !!req.body.type, state: req.body.state, ip });
      }
    }
  }

  res.end();
};
