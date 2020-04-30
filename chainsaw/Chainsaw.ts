import { CronJob } from "cron";

import aggregateWorldData from "./aggregateWorldData";
import fetchJohnsHopkinsData from "./fetchJohnsHopkinsData";
import fetchNarrativaApiData from "./fetchNarrativaApiData";

const FETCH_DATA_ON_START = true;

class Chainsaw {

  constructor() {
    const narrativaJob = new CronJob('0 0 16 * * *', fetchNarrativaApiData);
    const johnsJob = new CronJob('0 0 16 * * *', fetchJohnsHopkinsData);

    narrativaJob.start();
    johnsJob.start();
  }

  start() {
    if (FETCH_DATA_ON_START) {
      Promise.all(
        [
          fetchNarrativaApiData(),
          fetchJohnsHopkinsData()
        ]
      )
        .then(() => {
          aggregateWorldData();
        });
    }
  }
}

export default new Chainsaw();
