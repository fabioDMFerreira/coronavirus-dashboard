import { Router } from 'express';

import countries from './covid/countries';
import countryChartsData from './covid/countries/country';
import countryPivotData from './covid/countries/country/pivotData';
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
router.get('/covid/countries/pivotData', countriesPivotData);
router.get('/covid/countries/:country', countryChartsData);
router.get('/covid/countries/:country/pivotData', countryPivotData);
router.get('/covid/usa/pivotData', usaPivotData);
router.get('/covid/usa/regions/:region', usaRegion);
router.get('/covid/usa/regions/:region/pivotData', usaRegionPivotData);
router.get('/covid/usa', usa);

router.all('/state', state);

router.all('/subscribe', subscribe);

router.all('/votes', votes);
router.all('/votes/results', votesResults);

export default router;
