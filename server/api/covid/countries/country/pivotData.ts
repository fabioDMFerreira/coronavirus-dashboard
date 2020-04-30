import convertToCountryId from '@common/convertToCountryId';
import getCountryPivotData from '@covid/countries/getCountryPivotData';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {

  const country: string =
    typeof (req.params.country) === "string" ? convertToCountryId(req.params.country) : "";

  try{
    const data = await getCountryPivotData(country);
    res.json(data);
  } catch(err){
    res.status(400);
    res.json(err);
  }

  return res.end();
};
