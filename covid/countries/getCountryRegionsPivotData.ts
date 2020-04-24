import { AvailableCountriesRegions } from "@common/availableCountriesRegions";
import serializeUsaPivotTableData from "@covid/serializeUsaPivotTableData";

import getCountryRegionsChartData from "./getCountryRegionsChartData";

export default async (country: AvailableCountriesRegions) => {
  const chartsData = await getCountryRegionsChartData(country);

  return serializeUsaPivotTableData(chartsData.newCases, chartsData.newDeaths);
};
