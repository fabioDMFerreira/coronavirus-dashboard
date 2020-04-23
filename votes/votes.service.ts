import Vote from '@db/models/Vote.model';
import VotesResult from '@db/models/VotesResult.model';
import { DataType, TimeType } from 'client/types';

export default {

  createVote: async (ip: string, resource: any, type: boolean) => {
    const vote = await Vote.findOne({ ip, state: resource })

    if (!vote) {
      await Vote.create({ type, state: resource, ip });

      const voteKey = type ? 'up' : 'down';

      const date = new Date();

      await VotesResult.findOneAndUpdate({
        dataType: resource.dataType,
        timeType: resource.timeType,
        resource: resource.resource,
        date: Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
      }, {
        $set: {
          updatedAt: date,
        },
        $inc: {
          total: 1,
          [voteKey]: 1
        }
      }, { upsert: true })
    }
  },

  getSurveyResults: async (dataType: DataType, timeType: TimeType, resource: any) => {
    const date = new Date();

    const results = await VotesResult.findOne({
      dataType,
      timeType,
      resource,
      date: Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    });
    if (results) {
      return {
        up: results.up ? (results.up * 100 / results.total).toFixed(2) : 0,
        down: results.down ? (results.down * 100 / results.total).toFixed(2) : 0,
      }
    }
  }
}
