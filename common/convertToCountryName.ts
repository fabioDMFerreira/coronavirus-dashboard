import capitalize from "@utils/capitalize";

export default (country: string): any =>
  country ?
    country
      .split('_')
      .map(capitalize)
      .join(' ') :
    "";
