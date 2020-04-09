import covidRepository from './services/covid.repository';

export default async (req, res) => {
  const data = await covidRepository.getStatesData();

  res.end(JSON.stringify(data));
};
