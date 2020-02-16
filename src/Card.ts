import { CardType } from "./types";

function Card(number: number, suit: number): CardType {
  return {
    number,
    suit,
  }
}

export default Card;
