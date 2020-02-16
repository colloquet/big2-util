enum SuitEnum {
  Diamond = 1,
  Club,
  Heart,
  Spade,
}

export interface CardType {
  suit: SuitEnum;
  number: number;
}
