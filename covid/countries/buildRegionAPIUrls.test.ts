import buildRegionAPIUrls from "./buildRegionAPIUrls";


describe('buildRegionAPIUrls', () => {
  it('should return spain regions api urls', () => {

    const startDate = "2020-03-01";
    const endDate = "2020-03-05";

    const actual = buildRegionAPIUrls('spain', new Date(startDate), new Date(endDate));

    expect(actual).toEqual([
      ["Baleares", "https://api.covid19tracking.narrativa.com/api/country/spain/region/baleares?date_from=2020-3-1&date_to=2020-3-5"],
      ["Asturias", "https://api.covid19tracking.narrativa.com/api/country/spain/region/asturias?date_from=2020-3-1&date_to=2020-3-5"],
      ["Castilla y León", "https://api.covid19tracking.narrativa.com/api/country/spain/region/castilla_y_leon?date_from=2020-3-1&date_to=2020-3-5"],
      ["La Rioja", "https://api.covid19tracking.narrativa.com/api/country/spain/region/la_rioja?date_from=2020-3-1&date_to=2020-3-5"],
      ["Extremadura", "https://api.covid19tracking.narrativa.com/api/country/spain/region/extremadura?date_from=2020-3-1&date_to=2020-3-5"],
      ["Galicia", "https://api.covid19tracking.narrativa.com/api/country/spain/region/galicia?date_from=2020-3-1&date_to=2020-3-5"],
      ["Aragón", "https://api.covid19tracking.narrativa.com/api/country/spain/region/aragon?date_from=2020-3-1&date_to=2020-3-5"],
      ["Madrid", "https://api.covid19tracking.narrativa.com/api/country/spain/region/madrid?date_from=2020-3-1&date_to=2020-3-5"],
      ["Castilla-La Mancha", "https://api.covid19tracking.narrativa.com/api/country/spain/region/castilla-la_mancha?date_from=2020-3-1&date_to=2020-3-5"],
      ["Murcia", "https://api.covid19tracking.narrativa.com/api/country/spain/region/murcia?date_from=2020-3-1&date_to=2020-3-5"],
      ["Canarias", "https://api.covid19tracking.narrativa.com/api/country/spain/region/canarias?date_from=2020-3-1&date_to=2020-3-5"],
      ["C. Valenciana", "https://api.covid19tracking.narrativa.com/api/country/spain/region/c_valenciana?date_from=2020-3-1&date_to=2020-3-5"],
      ["Ceuta", "https://api.covid19tracking.narrativa.com/api/country/spain/region/ceuta?date_from=2020-3-1&date_to=2020-3-5"],
      ["Cataluña", "https://api.covid19tracking.narrativa.com/api/country/spain/region/cataluna?date_from=2020-3-1&date_to=2020-3-5"],
      ["Cantabria", "https://api.covid19tracking.narrativa.com/api/country/spain/region/cantabria?date_from=2020-3-1&date_to=2020-3-5"],
      ["Andalucía", "https://api.covid19tracking.narrativa.com/api/country/spain/region/andalucia?date_from=2020-3-1&date_to=2020-3-5"],
      ["País Vasco", "https://api.covid19tracking.narrativa.com/api/country/spain/region/pais_vasco?date_from=2020-3-1&date_to=2020-3-5"],
      ["Navarra", "https://api.covid19tracking.narrativa.com/api/country/spain/region/navarra?date_from=2020-3-1&date_to=2020-3-5"],
      ["Melilla", "https://api.covid19tracking.narrativa.com/api/country/spain/region/melilla?date_from=2020-3-1&date_to=2020-3-5"]]);
  });
});
