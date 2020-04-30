import convertToCountryId from '@common/convertToCountryId';
import getCountryChartData from '@covid/countries/getCountryChartData';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {

  const country: string =
    typeof (req.params.country) === "string" ? convertToCountryId(req.params.country) : "";

  try{
    const data = await getCountryChartData(country);
    res.json(data);
  } catch(err){
    res.status(400);
    res.write(err.message);
  }

  return res.end();
};
