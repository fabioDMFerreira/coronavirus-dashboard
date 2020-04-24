import Chainsaw from '@chainsaw/Chainsaw';
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import next from 'next';

import api from './api';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

Chainsaw.start();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(compression());
  server.use(morgan(':method :url :response-time'));

  server.use('/api', api);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Express Ready on http://localhost:${port}`);
  });
});
