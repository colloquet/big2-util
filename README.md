# big2-util

> A utility library for the game Big2 (鋤大Dee)

This library provides methods for validating moves between plays and some other useful helper functions.

## Install

```bash
# Yarn
yarn add big2-util

# NPM
npm install --save big2-util
```

## Usage

```js
import { Big2Engine, Card } from 'big2-util';

// Create Card object using Card(number, suit)
const royalFlush = [
  Card(1, 1),
  Card(2, 1),
  Card(3, 1),
  Card(4, 1),
  Card(5, 1),
];

const regularFlush = [
  Card(1, 1),
  Card(3, 1),
  Card(5, 1),
  Card(7, 1),
  Card(9, 1),
];

// Compare 2 plays with Big2Engine.validateMove(previousPlay, currentPlay)
const isValid = Big2Engine.validateMove(royalFlush, regularFlush);
// false, because Royal Flush beats Regular Flush!
```

## API

### Card parameters

| Name | Type | Description |
| number | number | The card's number, where 1 = A, 11 = J, 12 = Q and 13 = K |
| suit | number | The card's suit, where 1 = Diamond, 2 = Club, 3 = Heart and 4 = Spade |

### Big2Engine

| Method | Description |
| isSingle**(*cards: Card[]*) | Check if player played a single card. |
| isPair**(*cards: Card[]*) | Check if player played a valid pair. |
| isThreeOfAKind**(*cards: Card[]*) | Check if player played a valid three of a kind. |
| isThreeOfAKind**(*cards: Card[]*) | Check if player played a valid three of a kind. |
| isStraight**(*cards: Card[]*) | Check if player played a valid straight. |
| isFlush**(*cards: Card[]*) | Check if player played a valid flush. |
| isFullHouse**(*cards: Card[]*) | Check if player played a valid full house. |
| isFourOfAKind**(*cards: Card[]*) | Check if player played a valid four of a kind. (4 cards with same number plus any other card) |
| isRoyalFlush**(*cards: Card[]*) | Check if player played a valid royal flush. |
| isPass**(*cards: Card[]*) | Check if player have passed his/her turn. |
| isCardMorePowerful**(*card1: Card, card2: Card*) | Check if card 1 is more powerful than card 2. |
| validateCombination**(*cards: Card[]*) | Check if player played a valid combination. |
| validateMove**(*lastPlayedCards: Card[], cards: Card[]*) | Compare two sets of cards and check if the move is valid. |


## License

MIT © [Colloque Tsui](https://github.com/colloquet)