
import aggregateCountryRegionsData from "./aggregateCountryRegionsData";
import { CountryRegionChartSeries } from "./serializeCountryRegionChartData";

describe('aggregateRegionsData', () => {
  it('should aggregate data', () => {
    const region1: [string, CountryRegionChartSeries] = [
      'region1',
      { "newCases": [[1579737600000, 2], [1579824000000, 2]], "newDeaths": [[1579737600000, 1], [1579824000000, 1]], "totalCases": [[1579737600000, 10], [1579824000000, 22]], "totalDeaths": [[1579737600000, 8], [1579824000000, 9]] }
    ];
    const region2: [string, CountryRegionChartSeries] = [
      'region2',
      { "newCases": [[1579737600000, 2], [1579824000000, 2]], "newDeaths": [[1579737600000, 1], [1579824000000, 1]], "totalCases": [[1579737600000, 10], [1579824000000, 22]], "totalDeaths": [[1579737600000, 8], [1579824000000, 9]] }
    ];

    const actual = aggregateCountryRegionsData([region1, region2]);

    expect(actual).toEqual({
      "newCases": {
        "region1": [[1579737600000, 2], [1579824000000, 2]],
        "region2": [[1579737600000, 2], [1579824000000, 2]]
      },
      "newDeaths": {
        "region1": [[1579737600000, 1], [1579824000000, 1]],
        "region2": [[1579737600000, 1], [1579824000000, 1]]
      },
      "totalCases": {
        "region1": [[1579737600000, 10], [1579824000000, 22]],
        "region2": [[1579737600000, 10], [1579824000000, 22]]
      },
      "totalDeaths": {
        "region1": [[1579737600000, 8], [1579824000000, 9]],
        "region2": [[1579737600000, 8], [1579824000000, 9]]
      }
    });
  });
});
