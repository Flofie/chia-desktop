export interface TopFarmerResponse {
  topFarmers: {
    _id: string;
    rank: number;
    blocks_won: number;
    address: string;
  }[];
}
