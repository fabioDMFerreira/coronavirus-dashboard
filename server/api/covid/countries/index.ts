import covideService from '@covid/covid.service';
import { Request, Response } from 'express';

export default async (_req: Request, res: Response) => {
  const data = await covideService.getCountriesData();

  res.end(JSON.stringify(data));
};
