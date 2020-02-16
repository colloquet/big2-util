import { CardType } from './types';

const rankMap: { [key: number]: number } = { 1: 14, 2: 15 };

function getCardRank(card: CardType) {
  return rankMap[card.number] || card.number;
}

export function isConsecutive(numbers: number[]) {
  return numbers.every((num, i) => {
    const lastNumber = numbers[numbers.length - 1];
    const nextNumber = numbers[i + 1];
    return num === lastNumber || nextNumber === num + 1;
  });
}

export function isSameSuit(cards: CardType[]) {
  const { suit } = cards[0];
  return cards.every(card => card.suit === suit);
}

export function isSameNumber(cards: CardType[]) {
  return cards.every(card => card.number === cards[0].number);
}

export function getMeta(cards: CardType[]) {
  const occurrences = cards.reduce(
    (acc: { [key: number]: number }, cur) => ({
      ...acc,
      [cur.number]: cur.number in acc ? acc[cur.number] + 1 : 1,
    }),
    {},
  );

  const uniqueNumbers = Object.keys(occurrences).map(Number);
  const mostOccurredNumber: number = uniqueNumbers.reduce((acc, cur) =>
    occurrences[acc] > occurrences[cur] ? acc : cur,
  );
  const biggerPart = cards.filter(card => card.number === mostOccurredNumber);
  const cardToCompare = getBiggestCard(biggerPart);

  return {
    uniqueNumbersLength: uniqueNumbers.length,
    maxOccurrence: occurrences[mostOccurredNumber],
    mostOccurredNumber,
    cardToCompare,
  };
}

export function isSingle(cards: CardType[]) {
  return cards.length === 1;
}

export function isPair(cards: CardType[]) {
  return cards.length === 2 && isSameNumber(cards);
}

export function isTriplet(cards: CardType[]) {
  return cards.length === 3 && isSameNumber(cards);
}

export function isFive(cards: CardType[]) {
  return cards.length === 5;
}

export function isStraight(cards: CardType[]) {
  const numbers = cards.map(card => card.number).sort((a, b) => a - b);
  const ranks = cards.map(getCardRank).sort((a, b) => a - b);
  return isConsecutive(numbers) || isConsecutive(ranks);
}

export function isFlush(cards: CardType[]) {
  return isSameSuit(cards);
}

export function isFullHouse(cards: CardType[]) {
  const occurrences = getMeta(cards);
  return occurrences.uniqueNumbersLength === 2 && occurrences.maxOccurrence === 3;
}

export function isFourOfAKind(cards: CardType[]) {
  const occurrences = getMeta(cards);
  return occurrences.uniqueNumbersLength === 2 && occurrences.maxOccurrence === 4;
}

export function isRoyalFlush(cards: CardType[]) {
  return isStraight(cards) && isFlush(cards);
}

export function isPass(cards: CardType[]) {
  return cards.length === 0;
}

export function isCardMorePowerful(card1: CardType, card2: CardType) {
  const card1Score = getCardRank(card1) + card1.suit / 10;
  const card2Score = getCardRank(card2) + card2.suit / 10;
  return card1Score > card2Score;
}

export function getBiggestCard(cards: CardType[]) {
  return cards.reduce((acc, cur) => (isCardMorePowerful(acc, cur) ? acc : cur));
}

export function validateCombination(cards: CardType[]) {
  if (isPass(cards)) {
    return true;
  }

  if (isSingle(cards) || isPair(cards) || isTriplet(cards)) {
    return true;
  }

  if (isFive(cards)) {
    if (isStraight(cards) || isFlush(cards) || isFullHouse(cards) || isFourOfAKind(cards)) {
      return true;
    }
  }

  return false;
}

export function validateMove(lastPlayedCards: CardType[], cards: CardType[]) {
  if (isPass(lastPlayedCards)) {
    return !isPass(cards);
  }
  if (isPass(cards)) {
    return true;
  }

  if (isSingle(lastPlayedCards)) {
    if (!isSingle(cards)) {
      return false;
    }

    return isCardMorePowerful(cards[0], lastPlayedCards[0]);
  }

  if (isPair(lastPlayedCards)) {
    if (!isPair(cards)) {
      return false;
    }

    return isCardMorePowerful(cards[0], lastPlayedCards[0]);
  }

  if (isTriplet(lastPlayedCards)) {
    if (!isTriplet(cards)) {
      return false;
    }

    return isCardMorePowerful(cards[0], lastPlayedCards[0]);
  }

  if (isFive(lastPlayedCards)) {
    if (!isFive(cards)) {
      return false;
    }

    if (isStraight(lastPlayedCards)) {
      if (isStraight(cards)) {
        const myBiggestCard = getBiggestCard(cards);
        const opponentBiggestCard = getBiggestCard(lastPlayedCards);

        return isCardMorePowerful(myBiggestCard, opponentBiggestCard);
      }

      if (isFlush(cards) || isFullHouse(cards) || isFourOfAKind(cards) || isRoyalFlush(cards)) {
        return true;
      }

      return false;
    }

    if (isFlush(lastPlayedCards)) {
      if (isFlush(cards)) {
        if (cards[0].suit === lastPlayedCards[0].suit) {
          const myBiggestCard = getBiggestCard(cards);
          const opponentBiggestCard = getBiggestCard(lastPlayedCards);

          return isCardMorePowerful(myBiggestCard, opponentBiggestCard);
        }

        return cards[0].suit > lastPlayedCards[0].suit;
      }

      if (isFullHouse(cards) || isFourOfAKind(cards) || isRoyalFlush(cards)) {
        return true;
      }

      return false;
    }

    if (isFullHouse(lastPlayedCards)) {
      if (isFullHouse(cards)) {
        const myMeta = getMeta(cards);
        const opponentMeta = getMeta(lastPlayedCards);

        return isCardMorePowerful(myMeta.cardToCompare, opponentMeta.cardToCompare);
      }

      if (isFourOfAKind(cards) || isRoyalFlush(cards)) {
        return true;
      }

      return false;
    }

    if (isFourOfAKind(lastPlayedCards)) {
      if (isFourOfAKind(cards)) {
        const myMeta = getMeta(cards);
        const opponentMeta = getMeta(lastPlayedCards);

        return isCardMorePowerful(myMeta.cardToCompare, opponentMeta.cardToCompare);
      }

      if (isRoyalFlush(cards)) {
        return true;
      }

      return false;
    }

    if (isRoyalFlush(lastPlayedCards)) {
      if (isRoyalFlush(cards)) {
        if (cards[0].suit === lastPlayedCards[0].suit) {
          const myBiggestCard = getBiggestCard(cards);
          const opponentBiggestCard = getBiggestCard(lastPlayedCards);

          return isCardMorePowerful(myBiggestCard, opponentBiggestCard);
        }

        return cards[0].suit > lastPlayedCards[0].suit;
      }

      return false;
    }
  }

  return false;
}
