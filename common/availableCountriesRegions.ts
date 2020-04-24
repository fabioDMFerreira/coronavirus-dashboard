const availableCountriesRegions = ['spain', 'france'] as const;

export type AvailableCountriesRegions = typeof availableCountriesRegions[number];

export const isCountryRegionsAvailable = (country: any): country is AvailableCountriesRegions => availableCountriesRegions.includes(country.toLowerCase());

export default availableCountriesRegions;
