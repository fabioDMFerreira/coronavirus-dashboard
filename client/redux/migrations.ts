export default {
  0: (state: any) => {
    return {
      ...state,
      allCountriesFilter:{
        Location: state.allCountriesFilter
      },
      allRegionsFilter:{
        Location: state.allRegionsFilter
      },
      county:{
        ...state.county,
        multipleSeries:{
          ...state.county.multipleSeries,
          filter:{
            Location: state.county.multipleSeries.filter
          }
        }
      }
    };
  }
}
