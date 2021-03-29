"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankTopFarmer = void 0;
const lodash_1 = require("lodash");
function rankTopFarmer(topFarmers) {
    const rankings = lodash_1.chain(topFarmers)
        .map('count')
        .uniq()
        .sortBy()
        .reverse()
        .value();
    return lodash_1.map(topFarmers, (farmer) => {
        return lodash_1.defaults({ rank: lodash_1.indexOf(rankings, farmer.count) + 1 }, farmer);
    });
}
exports.rankTopFarmer = rankTopFarmer;
