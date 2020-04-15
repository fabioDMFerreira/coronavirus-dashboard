import hash from "./hash";

describe('hash', () => {
  it('should hash a string', () => {
    expect(hash('test')).toEqual("098f6bcd4621d373cade4e832627b4f6");
  });
})
