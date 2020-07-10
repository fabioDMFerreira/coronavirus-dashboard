export default interface NarrativaApiResponse {
  dates: {
    [date: string]: {
      countries: {
        [country: string]: {
          [key: string]: any;
          regions: [{
            [key: string]: any;
            date: string;
            id: string;
            name: string;
            today_confirmed: number;
            today_new_confirmed: number;
            today_deaths: number;
            today_new_deaths: number;
          }];
          today_confirmed: number;
          today_new_confirmed: number;
          today_deaths: number;
          today_new_deaths: number;
          name: string;
        };
      };
      info: any;
    };
  };
};;
