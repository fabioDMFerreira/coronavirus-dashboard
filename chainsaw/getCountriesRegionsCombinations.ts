import availableCountriesRegions from "@common/availableCountriesRegions";
// import regions from "@covid/countries/regions";
import fetch from "node-fetch";

// export const getLocalCountriesRegionsCombinations = () => {
//   return availableCountriesRegions.map(country => {
//     const countryRegions = regions[country];

//     return countryRegions.regions.map(
//       region => {
//         return [country, region.id];
//       }
//     );
//   }).reduce((final, actual) => {
//     return final.concat(actual);
//   }, []);
// };

export default (): Promise<[string, string][]> => {
  return Promise.all(
    availableCountriesRegions.map(
      async (country) => {
        const response: any = await fetch(`https://api.covid19tracking.narrativa.com/api/countries/${country}/regions`);
        const narrativaApiResult = await response.json();

        console.log(narrativaApiResult);
        return narrativaApiResult.countries[0][country].map((region: any) => [country, region.id]);
      }
    )
  ).then(data => {
    return data.reduce((flat, actual) => {
      return flat.concat(actual);
    }, []);
  });
};
