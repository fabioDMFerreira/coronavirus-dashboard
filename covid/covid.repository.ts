
import CovidDataModal from '@db/models/CovidData.model';
import mcache from 'memory-cache';

export type CovidRepositoryId = 'COUNTRIES_DATA' | 'USA_REGIONS_DATA' | string;

export default {
  get: (key: CovidRepositoryId) => {
    return mcache.get(key)
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: async (key: CovidRepositoryId, data: any) => {
    CovidDataModal.findOneAndUpdate({ name: key }, { createdAt: new Date(), data }, { upsert: true });
    mcache.put(key, data, 3600)
  }
}
