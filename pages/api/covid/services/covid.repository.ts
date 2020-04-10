import fetch from 'isomorphic-unfetch';

import serializeCountriesData from './serializeCountriesData';
import serializeUsaData from './serializeUsaData';

export default {
  getCountriesData: () => {

    return Promise.all([
      fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv')
        .then((res) => res.text()),
      // .then((res) => res
      // .replace('"Korea, South"', 'South Korea')
      // .replace('"Bonaire, Sint Eustatius and Saba"', 'Bonaire and Sint Eustatius and Saba')),
      fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
        .then((res) => res.text())
        // .then((res) => res
      // .replace('"Korea, South"', 'South Korea')
      // .replace('"Bonaire, Sint Eustatius and Saba"', 'Bonaire and Sint Eustatius and Saba')),
    ]).then(serializeCountriesData)
  },

  getUsaData: () => Promise.all(
    [
      fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
        .then((res) => res.text()),
      fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv')
        .then((res) => res.text())
    ],
  ).then(serializeUsaData),
};
