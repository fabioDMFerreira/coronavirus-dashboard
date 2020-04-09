import { serializeBubbleData } from './BubbleSerializer';

import usTotalCases from '../fixtures/usTotalCases';

describe('BubbleSerializer', () => {
  it('should return bubble data', async () => {
    const actual = await serializeBubbleData(usTotalCases);
    const expected = { 'American Samoa': [[1585526400000, 1], [1585612800000, 2], [1585699200000, 3], [1585785600000, 4]], Guam: [[1585526400000, 4], [1585612800000, 3], [1585699200000, 2], [1585785600000, 1]], 'Northern Mariana Islands': [[1585526400000, 1], [1585612800000, 2], [1585699200000, 3], [1585785600000, 4]] };

    expect(actual).toEqual(expected);
  });
});
