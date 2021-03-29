import { chain, defaults, indexOf, map } from 'lodash';

export function rankTopFarmer(topFarmers: { count: number }[]) {
  const rankings = chain(topFarmers)
    .map('count')
    .uniq()
    .sortBy()
    .reverse()
    .value();
  return map(topFarmers, (farmer) => {
    return defaults({ rank: indexOf(rankings, farmer.count) + 1 }, farmer);
  });
}
