import { Router } from 'express';

import countries from './covid/countries';
import usa from './covid/usa';
import usaRegion from './covid/usa/index';
import state from './state';
import subscribe from './subscribe';
import votes from './votes';

const router = Router();

router.get('/covid/countries', countries);
router.get('/covid/usa/:region', usaRegion);
router.get('/covid/usa', usa);


router.all('/state', state)

router.all('/subscribe', subscribe)

router.all('/votes', votes)


export default router;
