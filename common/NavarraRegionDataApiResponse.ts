export default interface NavarraRegionDataResponse {
  dates: {
    [date: string]: {
      countries: {
        [country: string]: {
          [key: string]: any;
          regions: [{
            date: string;
            id: string;
            name: string;
            today_confirmed: number;
            today_new_confirmed: number;
            today_deaths: number;
            today_new_deaths: number;
            [key: string]: any;
          }];
        };
      };
      info: any;
    };
  };
};;;;
