import fetch from 'isomorphic-unfetch';

import covidRepository from './covid.repository';
import serializeCountriesData from './serializeCountriesData';
import serializeCountriesPivotTableData from './serializeCountriesPivotTableData';
import { serializeUsaData, serializeUsaRegionData } from './serializeUsaData';
import serializeUsaPivotTableData from './serializeUsaPivotTableData';

const fetchUsaDataFromCSSEGI = () => Promise.all(
  [
    fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv')
      .then((res) => res.text()),
    fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_US.csv')
      .then((res) => res.text())
  ],
)

const fetchCountriesDataFromCSSEGI = () => Promise.all([
  fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv')
    .then((res) => res.text()),
  fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
    .then((res) => res.text())
])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveInCache = (name: string) => async (data: any) => {
  await covidRepository.set(name, data);

  return data;
}

const getFromCache = async (name: string) => {
  return covidRepository.get(name)
}

class CovidProxy {

  getCountriesData = async () => {
    const covidData = await getFromCache("COUNTRIES_DATA");

    if (covidData) {
      return covidData;
    }

    return fetchCountriesDataFromCSSEGI()
      .then(serializeCountriesData)
      .then(saveInCache("COUNTRIES_DATA"))
  }

  getCountriesPivotData = async () => {
    const covidData = await getFromCache("COUNTRIES_PIVOT_DATA");

    if (covidData) {
      return covidData;
    }

    const countriesData = await this.getCountriesData();

    const pivotData = serializeCountriesPivotTableData(countriesData);
    await saveInCache("COUNTRIES_PIVOT_DATA")(pivotData);

    return pivotData;
  }

  getUsaData = async () => {
    const covidData = await getFromCache("USA_REGIONS_DATA");

    if (covidData) {
      return covidData;
    }

    return fetchUsaDataFromCSSEGI()
      .then(saveInCache("USA_REGIONS_DATA"))
  }

  getUsaChartsData = async () => {
    const covidData = await getFromCache("USA_REGIONS_CHARTS_DATA");

    if (covidData) {
      return covidData;
    }

    return this.getUsaData()
      .then(serializeUsaData)
      .then(saveInCache("USA_REGIONS_CHARTS_DATA"))
  }

  getUsaPivotData = async () => {
    const covidData = await getFromCache("USA_PIVOT_DATA");

    if (covidData) {
      return covidData;
    }

    const { newCases, newDeaths } = await this.getUsaChartsData();

    const pivotData = serializeUsaPivotTableData(newCases, newDeaths);
    await saveInCache("USA_PIVOT_DATA")(pivotData);

    return pivotData;
  }

  getUsaRegionData = async (region: string) => {
    const covidData = await getFromCache(region.toUpperCase() + "_REGION_DATA");

    if (covidData) {
      return covidData;
    }

    return this.getUsaData()
      .then(serializeUsaRegionData(region))
      .then(saveInCache(region.toUpperCase() + "_REGION_DATA"))
  }

  getUsaRegionPivotData = async (region: string) => {
    const covidData = await getFromCache(region.toUpperCase() + "_REGION_PIVOT_DATA");

    if (covidData) {
      return covidData;
    }

    return this.getUsaRegionData(region)
      .then(chartsData => serializeUsaPivotTableData(chartsData.newCases, chartsData.newDeaths))
      .then(saveInCache(region.toUpperCase() + "_REGION_PIVOT_DATA"))
  }

}

export default new CovidProxy();
