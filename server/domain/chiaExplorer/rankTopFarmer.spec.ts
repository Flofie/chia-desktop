import { rankTopFarmer } from './rankTopFarmer';

describe('rankTopFarmer', () => {
  it('should rank', () => {
    const topFarmers = [
      { count: 100 },
      { count: 100 },
      { count: 100 },
      { count: 99 },
      { count: 2 },
    ] as { count: number }[];
    const expectedResult = [
      { count: 100, rank: 1 },
      { count: 100, rank: 1 },
      { count: 100, rank: 1 },
      { count: 99, rank: 2 },
      { count: 2, rank: 3 },
    ];
    expect(rankTopFarmer(topFarmers)).toEqual(expectedResult);
  });

  it('should not change input', () => {
    const topFarmers = [
      { count: 100 },
      { count: 100 },
      { count: 100 },
      { count: 99 },
      { count: 2 },
    ] as { count: number }[];
    rankTopFarmer(topFarmers);
    expect(topFarmers).toEqual(topFarmers);
  });
});
