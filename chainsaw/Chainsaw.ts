import { CronJob } from "cron";

import fetchCountryRegionsData from "./fetchCountryRegionsData";

class Chainsaw {

  constructor() {
    const job = new CronJob('0 0 16 * * *', fetchCountryRegionsData);

    job.start();
  }

  start() {
    fetchCountryRegionsData();
  }
}

export default new Chainsaw();
