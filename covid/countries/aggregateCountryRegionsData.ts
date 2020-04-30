import convertToCountryName from '@common/convertToCountryName';
import { ChartsData } from '@common/types';

export default (regionsData: [string, ChartsData][]): ChartsData => {

  const result: any = {
    totalCases: {},
    totalDeaths: {},
    newCases: {},
    newDeaths: {}
  };

  for (let i = 0; i < regionsData.length; i++) {
    const [regionName, data] = regionsData[i];

    const name = convertToCountryName(regionName);

    result.totalCases[name] = data.totalCases;
    result.totalDeaths[name] = data.totalDeaths;
    result.newCases[name] = data.newCases;
    result.newDeaths[name] = data.newDeaths;
  }

  return result;
};
