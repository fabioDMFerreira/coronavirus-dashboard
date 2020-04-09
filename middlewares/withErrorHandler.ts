import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export default (fn: NextApiHandler): NextApiHandler => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await fn(req, res)
  } catch (err) {
    console.log({ err });
    res.status(500)
    res.write(err.message)
    res.end()
  }
}
