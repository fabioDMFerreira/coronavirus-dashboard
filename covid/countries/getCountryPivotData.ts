import serializeUsaPivotTableData from "@covid/serializeUsaPivotTableData";

import getCountryChartData from "./getCountryChartData";

export default async (country: string) => {
  const chartsData = await getCountryChartData(country);

  return serializeUsaPivotTableData(chartsData.newCases, chartsData.newDeaths);
};
