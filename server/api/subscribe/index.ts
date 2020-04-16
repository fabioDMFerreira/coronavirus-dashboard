import Subscription from '@db/models/Subscription.model';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
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
};
