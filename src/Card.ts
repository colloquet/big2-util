import { CardType } from "./types";

function Card(num: number, suit: number): CardType {
  return {
    number: num,
    suit,
  }
}

export default Card;
