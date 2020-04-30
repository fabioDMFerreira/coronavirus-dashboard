const narrativaAvailableCountries = [
  // 'belgium',
  // 'brazil',
  'canada',
  'china',
  // 'france',
  'germany',
  // 'india',
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

export type NarrativaAvailableCountries = typeof narrativaAvailableCountries[number];

export const isNarrativaAvailableCountry = (country: any): country is NarrativaAvailableCountries => narrativaAvailableCountries.includes(convertToCountryId(country));

export default narrativaAvailableCountries;
