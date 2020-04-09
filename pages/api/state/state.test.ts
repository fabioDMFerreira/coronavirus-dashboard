import { IncomingMessage, OutgoingMessage } from 'http';
import { Socket } from 'net';
import { NextApiRequest, NextApiResponse } from 'next';

import { stateHandler } from './index';


describe('/api/state', () => {
  describe('POST', () => {

    it('should return 400', () => {
      // const req: NextApiRequest = {
      //   ...new IncomingMessage(new Socket()),
      //   query: {
      //   },
      //   /**
      //    * Object of `cookies` from header
      //    */
      //   cookies: {
      //   },
      //   body: {},
      //   env: {},
      // }
      // const res = new OutgoingMessage();

      // stateHandler(req, res);

      // expect(res.status).toEqual(400);
    })
  });
})
