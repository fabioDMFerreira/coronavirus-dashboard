import Papa from 'papaparse';

export const buildSheetFromCSV = (csv: string): Promise<string[][]> =>
  new Promise(
    (accept) => {
      Papa.parse(csv.trim(), {
        complete: (parsed) => {
          return accept(parsed.data)
        }
      })
    }
  )
