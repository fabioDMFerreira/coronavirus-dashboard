import { buildSheetFromCSV } from "./csvUtils";

const usTotalCases = `UID,iso2,iso3,code3,FIPS,Admin2,Province_State,Country_Region,Lat,Long_,Combined_Key,3/30/20,3/31/20,4/1/20,4/2/20
16,AS,ASM,16,60.0,,American Samoa,US,-14.270999999999999,-170.132,"American Samoa, US",1,2,3,4
316,GU,GUM,316,66.0,,Guam,US,13.4443,144.7937,"Guam, US",4,3,2,1
580,MP,MNP,580,69.0,,Northern Mariana Islands,US,15.0979,145.6739,"Northern Mariana Islands, US",1,2,3,4`;

describe('csvUtils', () => {
  it('buildSheetFromCSV should convert a csv string to a string matrix', async () => {
    const actual = await buildSheetFromCSV(usTotalCases)
    const expected = [
      ["UID", "iso2", "iso3", "code3", "FIPS", "Admin2", "Province_State", "Country_Region", "Lat", "Long_", "Combined_Key", "3/30/20", "3/31/20", "4/1/20", "4/2/20"],
      ["16", "AS", "ASM", "16", "60.0", "", "American Samoa", "US", "-14.270999999999999", "-170.132", "American Samoa, US", "1", "2", "3", "4"],
      ["316", "GU", "GUM", "316", "66.0", "", "Guam", "US", "13.4443", "144.7937", "Guam, US", "4", "3", "2", "1"],
      ["580", "MP", "MNP", "580", "69.0", "", "Northern Mariana Islands", "US", "15.0979", "145.6739", "Northern Mariana Islands, US", "1", "2", "3", "4"]
    ];

    expect(actual).toEqual(expected);
  });
})
