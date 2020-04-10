import { NextApiRequest, NextApiResponse } from 'next';

import covidRepository from './services/covid.repository';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const data = await covidRepository.getCountriesData();

  res.end(JSON.stringify(data));
};
