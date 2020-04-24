import { ChartsData } from '@common/types';

import { CountryRegionChartSeries } from './serializeCountryRegionChartData';


export default (regionsData: [string, CountryRegionChartSeries][]): ChartsData => {

  const result: any = {
    totalCases: {},
    totalDeaths: {},
    newCases: {},
    newDeaths: {}
  };

  for (let i = 0; i < regionsData.length; i++) {
    const [name, data] = regionsData[i];
    result.totalCases[name] = data.totalCases.reverse();
    result.totalDeaths[name] = data.totalDeaths.reverse();
    result.newCases[name] = data.newCases.reverse();
    result.newDeaths[name] = data.newDeaths.reverse();
  }

  return result;
};
