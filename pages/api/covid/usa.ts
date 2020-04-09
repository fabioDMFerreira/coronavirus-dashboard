import covidRepository from './services/covid.repository';

export default async (_req: any, res: any) => {
  const data = await covidRepository.getStatesData();

  res.end(JSON.stringify(data));
};
