import { ChartsData } from '@common/types';

import { CountryRegionChartSeries } from './serializeCountryRegionChartData';

const sort = (a: any, b: any) => a[0] - b[0];

export default (regionsData: [string, CountryRegionChartSeries][]): ChartsData => {

  const result: any = {
    totalCases: {},
    totalDeaths: {},
    newCases: {},
    newDeaths: {}
  };

  for (let i = 0; i < regionsData.length; i++) {
    const [name, data] = regionsData[i];
    result.totalCases[name] = data.totalCases.sort(sort);
    result.totalDeaths[name] = data.totalDeaths.sort(sort);
    result.newCases[name] = data.newCases.sort(sort);
    result.newDeaths[name] = data.newDeaths.sort(sort);
  }

  return result;
};
