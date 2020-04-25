import { convertToCountryId,isCountryRegionsAvailable } from '@common/availableCountriesRegions';
import getCountryRegionsChartData from '@covid/countries/getCountryRegionsChartData';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {

  const country: string =
    typeof (req.params.country) === "string" ? convertToCountryId(req.params.country) : "";

  if (isCountryRegionsAvailable(country)) {
    const data = await getCountryRegionsChartData(country);
    res.json(data);
  } else {
    res.write("false");
  }

  return res.end();
};
