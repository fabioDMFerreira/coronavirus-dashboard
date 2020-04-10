import fetch from 'isomorphic-unfetch';

import CovidData from './CovidData.model';
import serializeCountriesData from './serializeCountriesData';
import serializeUsaData from './serializeUsaData';

const validateDate = (date: Date) => Math.abs(new Date().getTime() - date.getTime()) / 36e5 < 1

const saveInCache = (name: string) => async (data: any) => {
  await CovidData.findOneAndUpdate({ name: name }, { createdAt: new Date(), data }, { upsert: true });

  return data;
}

const getFromCache = async (name: string) => {
  const covidData = await CovidData.findOne({ name });

  if (covidData && validateDate(covidData.createdAt)) {
    return covidData.data;
  }
}

const COUNTRIES_DATA = 'COUNTRIES_DATA';
const USA_REGIONS_DATA = 'USA_REGIONS_DATA';

export default {
  getCountriesData: async () => {

    const covidData = await getFromCache(COUNTRIES_DATA)

    console.log(COUNTRIES_DATA, !!covidData);
    if (covidData) {
      return covidData;
    }

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
    ])
      .then(serializeCountriesData)
      .then(saveInCache(COUNTRIES_DATA))
  },

  getUsaData: async () => {

    const covidData = await getFromCache(USA_REGIONS_DATA);

    console.log(USA_REGIONS_DATA, !!covidData);
    if (covidData) {
      return covidData;
    }

    return Promise.all(
      [
        fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
          .then((res) => res.text()),
        fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv')
          .then((res) => res.text())
      ],
    ).then(serializeUsaData)
      .then(saveInCache(USA_REGIONS_DATA))
  }
};
