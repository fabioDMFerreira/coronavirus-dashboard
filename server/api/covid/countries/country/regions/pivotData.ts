import { isCountryRegionsAvailable } from '@common/availableCountriesRegions';
import convertToCountryId from '@common/convertToCountryId';
import getCountryRegionsPivotData from '@covid/countries/getCountryRegionsPivotData';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {

  const country: string =
    typeof (req.params.country) === "string" ? convertToCountryId(req.params.country) : "";

  if (isCountryRegionsAvailable(country)) {
    const data = await getCountryRegionsPivotData(country);
    res.json(data);
  } else {
    res.status(400);
  }

  return res.end();
};
