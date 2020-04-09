import { buildSheetFromCSV } from './csvUtils';

export default (csv: string, formatter?: { [key: string]: (value: any) => any }) => {
  const sheet = buildSheetFromCSV(csv);

  const headers = sheet[0];

  return sheet
    .slice(1)
    .reduce(
      (json, row) => {
        const obj: any = {};

        let l = row.length;
        while (l-- > 0) {
          const key = headers[l];
          obj[key] = formatter && formatter[key] ? formatter[key](row[l]) : row[l];
        }

        json.push(obj);

        return json;
      }, [],
    );
};
