import CovidService from '@covid/covid.service';
import { Request, Response } from 'express';

export default async (_req: Request, res: Response) => {
  const data = await CovidService.getUsaData();

  res.end(JSON.stringify(data));
};
