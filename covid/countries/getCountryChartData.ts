import covidRepository from "@covid/covid.repository";

import getCountryData from "./getCountryData";

export default async (country: string) => {

  const cacheData = await covidRepository.get(`${country}_CHART_DATA`);

  if (cacheData) {
    return cacheData;
  }

  const [, countryData] = await getCountryData(country);

  covidRepository.set(`${country}_CHART_DATA`, countryData);

  return countryData;
};
