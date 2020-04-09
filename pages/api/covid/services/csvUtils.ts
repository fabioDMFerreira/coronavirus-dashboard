export const buildSheetFromCSV = (csv: string) => csv.split('\n').map(row => row.split(','));
