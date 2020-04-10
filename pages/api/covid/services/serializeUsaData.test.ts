import serializeUsaData from "./serializeUsaData";

const usTotalCases = `UID,iso2,iso3,code3,FIPS,Admin2,Province_State,Country_Region,Lat,Long_,Combined_Key,3/30/20,3/31/20,4/1/20,4/2/20
16,AS,ASM,16,60.0,,American Samoa,US,-14.270999999999999,-170.132,"American Samoa, US",1,2,3,4
316,GU,GUM,316,66.0,,Guam,US,13.4443,144.7937,"Guam, US",4,3,2,1
580,MP,MNP,580,69.0,,Northern Mariana Islands,US,15.0979,145.6739,"Northern Mariana Islands, US",1,2,3,4`;

const usTotalDeaths = `UID,iso2,iso3,code3,FIPS,Admin2,Province_State,Country_Region,Lat,Long_,Combined_Key,Population,1/22/20,1/23/20,1/24/20
16,AS,ASM,16,60.0,,American Samoa,US,-14.271,-170.132,"American Samoa, US",55641,1,3,6
316,GU,GUM,316,66.0,,Guam,US,13.4443,144.7937,"Guam, US",164229,2,4,8
580,MP,MNP,580,69.0,,Northern Mariana Islands,US,15.0979,145.6739,"Northern Mariana Islands, US",55144,6,8,10`

describe('serializeUsaData', () => {


  it('should return data with the correct format', async () => {
    const actual = await serializeUsaData([usTotalCases, usTotalDeaths]);
    const expected: typeof actual = [{
      "newCases": {
        "American Samoa": [[1579651200000, 1], [1579737600000, 2], [1579824000000, 3]],
        "Guam": [[1579651200000, 2], [1579737600000, 2], [1579824000000, 4]],
        "Northern Mariana Islands": [[1579651200000, 6], [1579737600000, 2], [1579824000000, 2]],
        "USA": [[1579651200000, 9], [1579737600000, 6], [1579824000000, 9]]
      },
      "newDeaths": {
        "American Samoa": [[1585526400000, 1], [1585612800000, 1], [1585699200000, 1], [1585785600000, 1]],
        "Guam": [[1585526400000, 4], [1585612800000, -1], [1585699200000, -1], [1585785600000, -1]],
        "Northern Mariana Islands": [[1585526400000, 1], [1585612800000, 1], [1585699200000, 1], [1585785600000, 1]],
        "USA": [[1585526400000, 6], [1585612800000, 1], [1585699200000, 1], [1585785600000, 1]],
      },
      "totalCases": {
        "American Samoa": [[1579651200000, 1], [1579737600000, 3], [1579824000000, 6]],
        "Guam": [[1579651200000, 2], [1579737600000, 4], [1579824000000, 8]],
        "Northern Mariana Islands": [[1579651200000, 6], [1579737600000, 8], [1579824000000, 10]],
        "USA": [[1579651200000, 9], [1579737600000, 15], [1579824000000, 24]]
      }, "totalDeaths": {
        "American Samoa": [[1585526400000, 1], [1585612800000, 2], [1585699200000, 3], [1585785600000, 4]],
        "Guam": [[1585526400000, 4], [1585612800000, 3], [1585699200000, 2], [1585785600000, 1]],
        "Northern Mariana Islands": [[1585526400000, 1], [1585612800000, 2], [1585699200000, 3], [1585785600000, 4]],
        "USA": [[1585526400000, 6], [1585612800000, 7], [1585699200000, 8], [1585785600000, 9]],
      }
    }, [
      ["Date", "Location", "New Cases", "New Deaths", "Total Cases", "Total Deaths"],
      [new Date("2020-04-02T00:00:00.000Z"), "Northern Mariana Islands", 0, 1],
      [new Date("2020-04-01T00:00:00.000Z"), "Northern Mariana Islands", 0, 1],
      [new Date("2020-03-31T00:00:00.000Z"), "Northern Mariana Islands", 0, 1],
      [new Date("2020-03-30T00:00:00.000Z"), "Northern Mariana Islands", 0, 1],
      [new Date("2020-01-24T00:00:00.000Z"), "Northern Mariana Islands", 2],
      [new Date("2020-01-23T00:00:00.000Z"), "Northern Mariana Islands", 2],
      [new Date("2020-01-22T00:00:00.000Z"), "Northern Mariana Islands", 6],
      [new Date("2020-04-02T00:00:00.000Z"), "Guam", 0, -1],
      [new Date("2020-04-01T00:00:00.000Z"), "Guam", 0, -1],
      [new Date("2020-03-31T00:00:00.000Z"), "Guam", 0, -1],
      [new Date("2020-03-30T00:00:00.000Z"), "Guam", 0, 4],
      [new Date("2020-01-24T00:00:00.000Z"), "Guam", 4],
      [new Date("2020-01-23T00:00:00.000Z"), "Guam", 2],
      [new Date("2020-01-22T00:00:00.000Z"), "Guam", 2],
      [new Date("2020-04-02T00:00:00.000Z"), "American Samoa", 0, 1],
      [new Date("2020-04-01T00:00:00.000Z"), "American Samoa", 0, 1],
      [new Date("2020-03-31T00:00:00.000Z"), "American Samoa", 0, 1],
      [new Date("2020-03-30T00:00:00.000Z"), "American Samoa", 0, 1],
      [new Date("2020-01-24T00:00:00.000Z"), "American Samoa", 3],
      [new Date("2020-01-23T00:00:00.000Z"), "American Samoa", 2],
      [new Date("2020-01-22T00:00:00.000Z"), "American Samoa", 1]
    ]
    ,
    ["American Samoa", "Guam", "Northern Mariana Islands", "USA"]
    ]

    // expect(actual[0].totalCases).toEqual(expected[0].totalCases)
    // expect(actual[0].newCases).toEqual(expected[0].newCases)
    // expect(actual[0].totalDeaths).toEqual(expected[0].totalDeaths)
    // expect(actual[0].newDeaths).toEqual(expected[0].newDeaths)
    // expect(actual[0]).toEqual(expected[0]);
    // expect(actual[2]).toEqual(expected[2]);
    // expect(actual[1]).toEqual(expected[1]);

    // expect(actual).toEqual(expected);
  })


});
