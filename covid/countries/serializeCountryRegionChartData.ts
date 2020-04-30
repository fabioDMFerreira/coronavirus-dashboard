import NarrativaApiResponse from "@common/NarrativaApiResponse";

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


export default (apiData: NarrativaApiResponse): CountryRegionChartSeries => {
  const data = Object.entries(apiData.dates);

  const result: CountryRegionChartSeries = {
    totalCases: [],
    totalDeaths: [],
    newCases: [],
    newDeaths: []
  };

  return data.reduce((chartsData, [date, obj]) => {

    const utcTime = getUtcTime(date);

    const objCountry = Object.keys(obj.countries)[0];
    const regionData = obj.countries[objCountry].regions[0];
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
