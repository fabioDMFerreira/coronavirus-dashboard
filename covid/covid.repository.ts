
import CovidDataModal from '@db/models/CovidData.model';

export type CovidRepositoryId = 'COUNTRIES_DATA' | 'USA_REGIONS_DATA';

export default {
  get: (key: CovidRepositoryId) => {
    return CovidDataModal.findOne({ name: key });
  },
  set: (key: CovidRepositoryId, data: any) => {
    return CovidDataModal.findOneAndUpdate({ name: key }, { createdAt: new Date(), data }, { upsert: true });
  }
}
