import availableCountriesRegions from "@common/availableCountriesRegions";
import regions from "@covid/countries/regions";

export default ()=>{
  return availableCountriesRegions.map(country => {
    const countryRegions = regions[country];

    return countryRegions.regions.map(
      region => {
        return [country, region.id];
      }
    );
  }).reduce((final, actual) => {
    return final.concat(actual);
  }, []);
};
