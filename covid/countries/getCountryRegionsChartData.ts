import { AvailableCountriesRegions } from "@common/availableCountriesRegions";
import covidRepository from "@covid/covid.repository";

import aggregateCountryRegionsData from "./aggregateCountryRegionsData";
import getCountryRegionsData from "./getCountryRegionsData";

export default async (country: AvailableCountriesRegions) => {

  const cacheData = await covidRepository.get(`${country}_REGIONS_CHART_DATA`);

  if (cacheData) {
    return cacheData;
  }

  const regionsData = await getCountryRegionsData(country);

  const aggregator = aggregateCountryRegionsData(regionsData);

  covidRepository.set(`${country}_REGIONS_CHART_DATA`, aggregator);

  return aggregator;
};
