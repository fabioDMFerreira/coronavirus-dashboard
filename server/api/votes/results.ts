import votesService from '@votes/votes.service';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    const response = await votesService.getSurveyResults(
      +req.query.timeType,
      +req.query.dataType,
      req.query.resource
    );

    res.json(response);
  }

  res.end();
};
