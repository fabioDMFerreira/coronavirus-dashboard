import Page from 'client/Page';
import Country from 'client/pages/Country';
// import covidService from '@covid/covid.service';

// export async function getStaticProps() {
//   const [chartsData, pivotData, countries] = await covidService.getCountriesData();

//   return {
//     props: {
//       chartsData,
//       pivotData,
//       countries
//     },
//   }
// }

export default () => Page(Country)
