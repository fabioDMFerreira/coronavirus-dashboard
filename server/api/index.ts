import { Router } from 'express';

import countries from './covid/countries';
import countriesChartData from './covid/countries/chartData';
import countryChartData from './covid/countries/country/chartData';
import countryPivotData from './covid/countries/country/pivotData';
import countryRegionsChartsData from './covid/countries/country/regions/chartData';
import countryRegionsPivotData from './covid/countries/country/regions/pivotData';
import countriesPivotData from './covid/countries/pivotData';
import usa from './covid/usa';
import usaPivotData from './covid/usa/pivotData';
import usaRegion from './covid/usa/regions/index';
import usaRegionPivotData from './covid/usa/regions/pivotData';
import state from './state';
import subscribe from './subscribe';
import votes from './votes';
import votesResults from './votes/results';

const router = Router();

router.get('/covid/countries', countries);
router.get('/covid/countries/chartData', countriesChartData);
router.get('/covid/countries/pivotData', countriesPivotData);
router.get('/covid/countries/:country/chartData', countryChartData);
router.get('/covid/countries/:country/pivotData', countryPivotData);
router.get('/covid/countries/:country/regions/chartData', countryRegionsChartsData);
router.get('/covid/countries/:country/regions/pivotData', countryRegionsPivotData);
router.get('/covid/usa/pivotData', usaPivotData);
router.get('/covid/usa/regions/:region/chartData', usaRegion);
router.get('/covid/usa/regions/:region/pivotData', usaRegionPivotData);
router.get('/covid/usa/chartData', usa);

router.all('/state', state);

router.all('/subscribe', subscribe);

router.all('/votes', votes);
router.all('/votes/results', votesResults);

export default router;
