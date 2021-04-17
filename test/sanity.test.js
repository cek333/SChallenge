const csvParse = require('../highestProfit');

describe('sanity testing of non-I/O functions', () => {
  test('data to rows', () => {
    const result = dataToRows('1\n2\n3\n4\n5\n6\n');
    expect(result).toEqual([['1'],['2'],['3'],['4'],['5'],['6']]);
  });

  test('remove non-numeric profit', () => {
    const data = ['a,b,c,d,12','x,x,x,x,x','e,f,g,h,13.3','l,m,n,o,-10'];
    const result = removeRowsWithNonNumericProfit(data);
    expect(result.length).toEqual(3);
    expect(result[0]).toEqual(data[0]);
    expect(result[1]).toEqual(data[2]);
    expect(result[2]).toEqual(data[3]);
  });

  test('data to json', () => {
    const expHdrs = ['year', 'rank', 'company', 'revenue'];
    const expData = [];
    expData.push([2000,1,'c',22,12]);
    expData.push([2001,2,"y,z",10,-10]);
    expData.push([2002,3,'g',23,13]);
    const data = ['2000,1,c,22,12','2001,2,"y,z",10,-10','2002,3,g,23,13'];
    const result = dataToJson(data);
    result.forEach((row, idx) => {
      expect(Object.keys(row)).toEqual(expHdrs);
      expect(Object.values(row)).toEqual(expData[idx]);
    });
  });

  test('sort by profit', () => {
    const expData = [];
    const data = ['2000,1,c,22,12','2001,2,"y,z",10,-10','2002,3,g,23,13'];
    const json = dataToJson(data);
    const sorted = sortByProfitInPlace(json);
    const profits = sorted.map(obj => obj.profit);
    expect(profits).toEqual([-10,12,13]);
  });
});
