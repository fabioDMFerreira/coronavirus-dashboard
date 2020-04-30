import AsyncRetry from "async-retry";

import NarrativaApiResponse from "../common/NarrativaApiResponse";

export default (url: string): Promise<NarrativaApiResponse> => {
  return AsyncRetry(async bail => {
    // if anything throws, we retry
    const res = await fetch(url);

    if (403 === res.status) {
      // don't retry upon 403
      bail(new Error('Unauthorized'));
      return;
    }

    if (res.status === 504) {
      throw new Error('Endpoint request timed out');
    }

    return res.json();
  }
  , { retries: 20, minTimeout: 5000, maxTimeout: 60000 });
};
