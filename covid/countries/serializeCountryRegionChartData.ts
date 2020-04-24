import { AvailableCountriesRegions } from "@common/availableCountriesRegions";
import NavarraRegionDataResponse from "@common/NavarraRegionDataApiResponse";
import capitalize from "@utils/capitalize";

type HighchartsSerie = [number, number][];

export interface CountryRegionChartSeries {
  totalCases: HighchartsSerie;
  totalDeaths: HighchartsSerie;
  newDeaths: HighchartsSerie;
  newCases: HighchartsSerie;
}

export const getUtcTime = (date: string): number => {
  const match = /(\d*)-(\d*)-(\d*)/.exec(date);

  if (match) {
    return Date.UTC(+match[1], +match[2] - 1, +match[3]);
  }

  return 0;
};


export default (country: AvailableCountriesRegions, apiData: NavarraRegionDataResponse): CountryRegionChartSeries => {
  const data = Object.entries(apiData.dates);

  const result: CountryRegionChartSeries = {
    totalCases: [],
    totalDeaths: [],
    newCases: [],
    newDeaths: []
  };

  return data.reduce((chartsData, [date, obj]) => {

    const utcTime = getUtcTime(date);

    const regionData = obj.countries[capitalize(country)].regions[0];
    const totalCases = regionData.today_confirmed;
    const newCases = regionData.today_new_confirmed;
    const totalDeaths = regionData.today_deaths;
    const newDeaths = regionData.today_new_deaths;

    chartsData.totalCases.push([utcTime, totalCases]);
    chartsData.newCases.push([utcTime, newCases]);
    chartsData.totalDeaths.push([utcTime, totalDeaths]);
    chartsData.newDeaths.push([utcTime, newDeaths]);


    return chartsData;
  }, result);
};
