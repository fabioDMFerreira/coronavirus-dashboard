import spainRegion from "@covid/fixtures/spainRegion";

import NarrativaApiResponse from "../../common/NarrativaApiResponse";
import serializeCountryRegionChartsData from "./serializeCountryRegionChartData";

describe('serializeCountryRegionChartData', () => {
  it('should return data serialized', () => {
    const data: NarrativaApiResponse = spainRegion;

    const actual = serializeCountryRegionChartsData(data);

    expect(actual).toEqual({ "newCases": [[1579737600000, 2], [1579824000000, 2]], "newDeaths": [[1579737600000, 1], [1579824000000, 1]], "totalCases": [[1579737600000, 10], [1579824000000, 22]], "totalDeaths": [[1579737600000, 8], [1579824000000, 9]] });
  });
});
