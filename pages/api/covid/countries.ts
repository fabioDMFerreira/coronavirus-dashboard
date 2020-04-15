import { NextApiRequest, NextApiResponse } from 'next';

import covideService from '@covid/covid.service';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const data = await covideService.getCountriesData();

  res.end(JSON.stringify(data));
};
