import covidRepository from './services/covid.repository';

export default async (_req: any, res: any) => {
  const data = await covidRepository.getCountriesData();

  res.end(JSON.stringify(data));
};
