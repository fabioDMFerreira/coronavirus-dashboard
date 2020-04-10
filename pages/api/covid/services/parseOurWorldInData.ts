import { EventsMap } from './chartSerializer';
import { buildSheetFromCSV } from "./csvUtils";

export default async (csv: string) => {
  const sheet = await buildSheetFromCSV(csv);

  const totalCases: EventsMap = {};
  const totalDeaths: EventsMap = {};

  sheet.slice(1).forEach((row) => {
    if (!row) {
      return;
    }

    const [date, location, , , total_cases, total_deaths]: string[] = row;

    if (!location || !+total_cases) {
      return;
    }

    if (location && !(location in totalCases)) {
      totalCases[location] = [];
      totalDeaths[location] = [];
    }

    const dateMs = new Date(date).getTime();

    totalCases[location].push([dateMs, +total_cases]);
    totalDeaths[location].push([dateMs, +total_deaths]);
  });

  return {
    totalCases,
    totalDeaths,
  };
}
