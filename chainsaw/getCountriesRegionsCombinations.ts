import availableCountriesRegions from "@common/availableCountriesRegions";
import fetch from "node-fetch";

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
