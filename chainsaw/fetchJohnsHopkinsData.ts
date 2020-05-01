import convertToCountryId from "@common/convertToCountryId";
import { isNarrativaAvailableCountry } from "@common/narrativaAvailableCountries";
import { parseCSSEGIData } from "@covid/chartSerializer";
import { getUtcTime } from "@covid/countries/serializeCountryRegionChartData";
import CovidCountryData from '@db/models/CovidCountryData.model';
import YYYYMMDD from "@utils/YYYYMMDD";
import colors from 'colors';

const fetchCountriesDataFromCSSEGI = () => Promise.all([
  fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv')
    .then((res) => res.text()),
  fetch('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv')
    .then((res) => res.text())
]);

const SOURCE = "Johns Hopkins";

export default async () => {
  const [data] = await fetchCountriesDataFromCSSEGI()
    .then(([deaths, cases]) => parseCSSEGIData(cases, deaths));

  const lastDate = data.totalCases['Portugal'][data.totalCases['Portugal'].length - 1][0];

  const lastDateItem = await CovidCountryData.findOne({ time: new Date(lastDate), source: SOURCE });

  if (lastDateItem) {
    return;
  }

  await Promise.all(
    Object.keys(data.totalCases)
      .map(
        (country: string) => {

          if (isNarrativaAvailableCountry(country)) {
            return;
          }

          const countryTotalCases = data.totalCases[country];
          const countryNewCases = data.newCases[country];
          const countryTotalDeaths = data.totalDeaths[country];
          const countryNewDeaths = data.newDeaths[country];

          return Promise.all(
            countryTotalCases.map(async ([time, totalCases]: [number, number], index: number) => {

              if (!totalCases) {
                return;
              }

              const date = YYYYMMDD(new Date(time));

              const newCases = countryNewCases[index][1];

              const deathsIndex = countryTotalDeaths.map((el: [number, number]) => el[0]).indexOf(time);

              const totalDeaths = deathsIndex >= 0 ? countryTotalDeaths[deathsIndex][1] : 0;
              const newDeaths = deathsIndex >= 0 ? countryNewDeaths[deathsIndex][1] : 0;

              await CovidCountryData.findOneAndUpdate(
                {
                  country: convertToCountryId(country),
                  source: SOURCE,
                  time: new Date(getUtcTime(date)),
                }, {
                  totalCases,
                  newCases,
                  totalDeaths,
                  newDeaths,
                  date,
                },
                { upsert: true }
              );
              console.log(colors.green(`${country}/${date} saved`));
            })
          );
        })
  );
};
