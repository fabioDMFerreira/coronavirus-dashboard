import { AvailableCountriesRegions } from "@common/availableCountriesRegions";
import YYYYMMDD from "@utils/YYYYMMDD";

import regions from "./regions";

export const buildNarrativaApiUrl = (country: string, region: string, startDate: string, endDate?: string) => {
  endDate = endDate || startDate;

  return `https://api.covid19tracking.narrativa.com/api/country/${country}/region/${region}?date_from=${startDate}&date_to=${endDate}`;
};

export default (country: AvailableCountriesRegions, startDate: Date, endDate: Date): [string, string][] => {

  const countryMetadata = regions[country];

  const start = YYYYMMDD(startDate);
  const end = YYYYMMDD(endDate);

  return countryMetadata.regions.map(
    (region) => {
      return [region.name, buildNarrativaApiUrl(country, region.id, start, end)];
    }
  );
};
