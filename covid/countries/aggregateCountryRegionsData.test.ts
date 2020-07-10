
import { CountryRegionChartSeries } from "@common/types";

import aggregateCountryRegionsData from "./aggregateCountryRegionsData";

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
        "Region1": [[1579737600000, 2], [1579824000000, 2]],
        "Region2": [[1579737600000, 2], [1579824000000, 2]]
      },
      "newDeaths": {
        "Region1": [[1579737600000, 1], [1579824000000, 1]],
        "Region2": [[1579737600000, 1], [1579824000000, 1]]
      },
      "totalCases": {
        "Region1": [[1579737600000, 10], [1579824000000, 22]],
        "Region2": [[1579737600000, 10], [1579824000000, 22]]
      },
      "totalDeaths": {
        "Region1": [[1579737600000, 8], [1579824000000, 9]],
        "Region2": [[1579737600000, 8], [1579824000000, 9]]
      }
    });
  });
});
