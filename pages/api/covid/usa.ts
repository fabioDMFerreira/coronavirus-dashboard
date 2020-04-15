import { NextApiRequest, NextApiResponse } from 'next';

import CovidService from '@covid/covid.service';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const data = await CovidService.getUsaData();

  res.end(JSON.stringify(data));
};
