import Papa from 'papaparse';

export default (csv: string): Promise<string[][]> =>
  new Promise(
    (accept) => {
      Papa.parse(csv.trim(), {
        complete: (parsed) => {
          return accept(parsed.data)
        }
      })
    }
  )
