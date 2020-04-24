import getCountriesRegionsCombinations from "./getCountriesRegionsCombinations";

describe('getCountriesRegionsCombinations', () => {
  const actual = getCountriesRegionsCombinations();
  const expected = [['spain', 'baleares'],
    ['spain', 'asturias'],
    ['spain', 'castilla_y_leon'],
    ['spain', 'la_rioja'],
    ['spain', 'extremadura'],
    ['spain', 'galicia'],
    ['spain', 'aragon'],
    ['spain', 'madrid'],
    ['spain', 'castilla-la_mancha'],
    ['spain', 'murcia'],
    ['spain', 'canarias'],
    ['spain', 'c_valenciana'],
    ['spain', 'ceuta'],
    ['spain', 'cataluna'],
    ['spain', 'cantabria'],
    ['spain', 'andalucia'],
    ['spain', 'pais_vasco'],
    ['spain', 'navarra'],
    ['spain', 'melilla'],
    ['france', 'french_polynesia'],
    ['france', 'saint_barthelemy'],
    ['france', 'nouvelle-aquitaine'],
    ['france', 'guadeloupe'],
    ['france', 'grand_est'],
    ['france', 'auvergne-rhône-alpes'],
    ['france', 'provence-alpes-côte_d’azur'],
    ['france', 'bretagne'],
    ['france', 'normandie'],
    ['france', 'martinique'],
    ['france', 'guyane'],
    ['france', 'new_caledonia'],
    ['france', 'reunion'],
    ['france', 'pays_de_la_loire'],
    ['france', 'occitanie'],
    ['france', 'st_martin'],
    ['france', 'mayotte'],
    ['france', 'corse'],
    ['france', 'french_guiana'],
    ['france', 'ile-de-france'],
    ['france', 'bourgogne-franche-comte'],
    ['france', 'hauts-de-france'],
    ['france', 'centre-val_de_loire']];

  expect(actual).toEqual(expected);
});
