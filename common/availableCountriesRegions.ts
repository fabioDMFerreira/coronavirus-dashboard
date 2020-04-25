const availableCountriesRegions = [
  // 'belgium',
  'brazil',
  'canada',
  'china',
  // 'france',
  'germany',
  'india',
  // 'iran',
  // 'ireland',
  'italy',
  // 'netherlands',
  // 'russia',
  // 'peru',
  'portugal',
  'spain',
  // 'sweden',
  // 'switzerland',
  // 'turkey',
  'united_kingdom'
] as const;

export const convertToCountryId = (country: string): any => country.toLowerCase().split(' ').join('_');

export type AvailableCountriesRegions = typeof availableCountriesRegions[number];

export const isCountryRegionsAvailable = (country: any): country is AvailableCountriesRegions => availableCountriesRegions.includes(convertToCountryId(country));

export default availableCountriesRegions;
