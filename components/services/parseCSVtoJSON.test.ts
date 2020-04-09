import parseCSVtoJSON from "./parseCSVtoJSON"

describe('parseCSVtoJSON', () => {
  it('should parse csv to json', () => {
    const actual = parseCSVtoJSON(`a,b\n1,2\n3,4`, { a: value => +value, b: value => +value });
    const expected = [
      {
        a: 1,
        b: 2,
      }, {
        a: 3,
        b: 4
      }
    ]

    expect(actual).toEqual(expected);
  })
})
