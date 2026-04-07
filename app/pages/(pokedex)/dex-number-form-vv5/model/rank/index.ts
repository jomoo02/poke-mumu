interface RankView {
  attackRank: number;
  defenseRank: number;
  hpRank: number;
  specialAttackRank: number;
  specialDefenseRank: number;
  speedRank: number;
  totalCount: number;
  totalRank: number;
  type1Count: number;
  type1Rank: number;
  type2Count: number;
  type2Rank: number;

  attackRankTied: number;
  defenseRankTied: number;
  hpRankTied: number;
  specialAttackRankTied: number;
  specialDefenseRankTied: number;
  speedRankTied: number;

  totalRankTied: number;

  type1RankTied: number;

  type2RankTied: number;
}

export { type RankView };
