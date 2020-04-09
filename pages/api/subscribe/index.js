import Subscription from './Subscription.model';

export default async (req, res) => {
  if (req.method === 'POST') {
    if (!req.body.email) {
      res.status(400);
    } else {
      await Subscription.findOneAndUpdate(
        { email: req.body.email },
        { createdAt: new Date() },
        { upsert: true }
      );
    }
  }

  res.end();
}
