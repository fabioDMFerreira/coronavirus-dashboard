import getTimespanRangeWeeks from "./getTimespanRangeWeeks";

describe('getTimespanRangeWeeks', () => {
  it('should return an empty array if start time is greater than end time', () => {
    expect(getTimespanRangeWeeks(20, 10)).toEqual([]);
  })

  it('should return one week if start time and end time are within same week', () => {
    expect(
      getTimespanRangeWeeks(
        new Date(2020, 0, 1).getTime(),
        new Date(2020, 0, 5).getTime()
      )
    ).toEqual(['Jan week 1']);
  });

  it('#1 should return a list of weeks', () => {
    expect(
      getTimespanRangeWeeks(
        new Date(2020, 0, 1).getTime(),
        new Date(2020, 1, 8).getTime()
      )
    ).toEqual([
      'Jan week 1',
      'Jan week 2',
      'Jan week 3',
      'Jan week 4',
      'Jan week 5',
      'Feb week 1',
      'Feb week 2'
    ]);
  })

  it('#2 should return a list of weeks', () => {
    expect(
      getTimespanRangeWeeks(
        new Date(2020, 1, 2).getTime(),
        new Date(2020, 2, 15).getTime()
      )
    ).toEqual([
      'Feb week 1',
      'Feb week 2',
      'Feb week 3',
      'Feb week 4',
      'Feb week 5',
      'Mar week 1',
      'Mar week 2',
      'Mar week 3',
    ]);

  })

  it('#3 should return a list of weeks', () => {
    expect(getTimespanRangeWeeks(
      new Date(2020, 0, 21).getTime(),
      new Date(2020, 3, 22).getTime()
    ))
      .toEqual([
        "Jan week 3",
        "Jan week 4",
        "Jan week 5",
        "Feb week 1",
        "Feb week 2",
        "Feb week 3",
        "Feb week 4",
        "Feb week 5",
        "Mar week 1",
        "Mar week 2",
        "Mar week 3",
        "Mar week 4",
        "Mar week 5",
        "Apr week 1",
        "Apr week 2",
        "Apr week 3",
        "Apr week 4"
      ])
  })
});
