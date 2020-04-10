import predictVelocity from "./predictVelocity";

describe('predictVelocity', () => {
  it('should predict value based on zero numbers', () => {
    const input: number[] = [];

    const actual = predictVelocity(input);
    const expected = 0;

    expect(actual).toEqual(expected)
  })

  it('should predict value based on one number', () => {
    const input = [1];

    const actual = predictVelocity(input);
    const expected = 1;

    expect(actual).toEqual(expected)
  })

  it('should predict value based on two numbers', () => {
    const input = [1, 3];

    const actual = predictVelocity(input);
    const expected = 5;

    expect(actual).toEqual(expected)
  })

  it('should predict value based on three numbers', () => {
    const input = [1, 3, 6];

    const actual = predictVelocity(input);
    const expected = 8.5;

    expect(actual).toEqual(expected)
  })
});
