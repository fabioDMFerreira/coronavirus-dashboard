import CovidService from '@covid/covid.service';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  const data = await CovidService.getUsaRegionData(req.params.region);

  res.end(JSON.stringify(data));
};
