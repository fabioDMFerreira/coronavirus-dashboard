import { parseOurWorldInData, calculateSerieGrowthRate, parseCSSEGIData, serializeGrowthArray, serializeCumulativeArray, getUtcDate } from "./ChartSerializer"

import ourWorldInData from "../fixtures/ourWorldInData"
import CSSEGITotalCasesData from "../fixtures/CSSEGITotalCasesData"
import CSSEGITotalDeathsData from "../fixtures/CSSEGITotalDeathsData"
import CSSEGITotalCasesDataWithStates from "../fixtures/CSSEGITotalCasesData-with-states"
import CSSEGITotalDeathsDataWithStates from "../fixtures/CSSEGITotalDeathsData-with-states"

describe('ChartSerializer', () => {

  describe('parseOurWorldInData', () => {

    it('should return csv parsed to a object', () => {
      const actual = parseOurWorldInData(ourWorldInData);

      expect(actual).toBeTruthy();

      if (actual) {
        expect(Object.keys(actual)).toEqual([
          "totalCases",
          "totalDeaths",
        ])

        expect(Object.keys(actual.totalCases)).toEqual(["Portugal", "Italy"])
        expect(Object.keys(actual.totalDeaths)).toEqual(["Portugal", "Italy"])

      }
    })
  })

  describe('parseCSSIGEData', () => {
    it('should return csv parsed to a object', () => {
      const [actual] = parseCSSEGIData(CSSEGITotalCasesData, CSSEGITotalDeathsData);

      expect(actual).toBeTruthy();

      if (actual) {
        expect(Object.keys(actual)).toEqual([
          "totalCases",
          "totalDeaths",
          "newCases",
          "newDeaths"
        ])

        expect(Object.keys(actual.totalCases)).toEqual(["Portugal", "Italy"])
        expect(Object.keys(actual.totalDeaths)).toEqual(["Portugal", "Italy"])
      }
    })

    it('should add state rows if there is a country global counter', () => {
      const [actual] = parseCSSEGIData(CSSEGITotalCasesDataWithStates, CSSEGITotalDeathsDataWithStates);

      expect(actual).toBeTruthy();

      expect(Object.keys(actual.totalCases)).toHaveLength(3);

      expect(actual.totalCases.Netherlands).toEqual([
        [getUtcDate('1/22/20'), 1],
        [getUtcDate('1/23/20'), 3],
        [getUtcDate('1/24/20'), 7],
        [getUtcDate('1/25/20'), 10]
      ])
    })

    it('should sum all states values if there is no global counter for that country', () => {
      const [actual] = parseCSSEGIData(CSSEGITotalCasesDataWithStates, CSSEGITotalDeathsDataWithStates);

      expect(actual).toBeTruthy();

      expect(Object.keys(actual.totalDeaths)).toHaveLength(1);

      expect(actual.totalDeaths.Netherlands).toEqual([
        [getUtcDate('1/22/20'), 2],
        [getUtcDate('1/23/20'), 4],
        [getUtcDate('1/24/20'), 10],
        [getUtcDate('1/25/20'), 13]
      ])
    })
  });

  describe('calculateSerieGrowthRate', () => {

    it('should return empty array if no data is passed', () => {
      const actual = calculateSerieGrowthRate([]);
      const expected: Array<[number]> = [];

      expect(actual).toEqual(expected);
    })

    it('should return empty array if serie passed just has one element', () => {
      const actual = calculateSerieGrowthRate([1]);
      const expected: Array<[number]> = [];

      expect(actual).toEqual(expected);
    })


    it('should return growth rates', () => {
      const actual = calculateSerieGrowthRate([100, 110, 121]);
      const expected = [10, 10];

      expect(actual).toEqual(expected);
    });

  });

  describe('serializeGrowthArray', () => {
    it('should return growth array', () => {
      expect(serializeGrowthArray([[0, 1], [1, 3], [2, 7]])).toEqual([[0, 1], [1, 2], [2, 4]])
    });
  })

  describe('serializeCumulativeArray', () => {
    it('should return cumulative array', () => {
      expect(serializeCumulativeArray([[0, 1], [1, 3], [2, 7]])).toEqual([[0, 1], [1, 4], [2, 11]])
    });
  })
})
