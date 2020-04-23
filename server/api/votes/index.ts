import votesService from '@votes/votes.service';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    if (!req.body.state) {
      res.status(404);
    } else {
      let ip = req.headers['x-forwarded-for']

      if (ip instanceof Array) {
        ip = ip[0]
      } else {
        ip = ip || '';
      }

      await votesService.createVote(ip, req.body.state, !!req.body.type)
    }
  }

  res.end();
};
