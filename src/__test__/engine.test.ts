import { Card, Big2Engine } from '../index';

const single = [Card(1, 1)];
const pair = [Card(1, 1), Card(1, 2)];
const triplet = [Card(1, 1), Card(1, 2), Card(1, 3)];

const straight = [Card(1, 1), Card(2, 1), Card(3, 1), Card(4, 1), Card(5, 2)];
const flush = [Card(1, 1), Card(2, 1), Card(3, 1), Card(4, 1), Card(6, 1)];
const fullHouse = [Card(1, 1), Card(1, 2), Card(1, 3), Card(2, 1), Card(2, 2)];
const fourOfAKind = [Card(1, 1), Card(1, 2), Card(1, 3), Card(1, 4), Card(2, 2)];
const royalFlush = [Card(1, 1), Card(2, 1), Card(3, 1), Card(4, 1), Card(5, 1)];

test('identify singles', () => {
  expect(Big2Engine.isSingle(single)).toBe(true);
  expect(Big2Engine.isSingle(pair)).toBe(false);
  expect(Big2Engine.isSingle(triplet)).toBe(false);
});

test('identify pairs', () => {
  expect(Big2Engine.isPair(single)).toBe(false);
  expect(Big2Engine.isPair(pair)).toBe(true);
  expect(Big2Engine.isPair(triplet)).toBe(false);
});

test('identify triplets', () => {
  expect(Big2Engine.isTriplet(single)).toBe(false);
  expect(Big2Engine.isTriplet(pair)).toBe(false);
  expect(Big2Engine.isTriplet(triplet)).toBe(true);
});

test('identify straights', () => {
  expect(Big2Engine.isStraight(straight)).toBe(true);
  expect(Big2Engine.isStraight(flush)).toBe(false);
  expect(Big2Engine.isStraight(fullHouse)).toBe(false);
  expect(Big2Engine.isStraight(fourOfAKind)).toBe(false);
  expect(Big2Engine.isStraight(royalFlush)).toBe(true);
});

test('identify flushes', () => {
  expect(Big2Engine.isFlush(straight)).toBe(false);
  expect(Big2Engine.isFlush(flush)).toBe(true);
  expect(Big2Engine.isFlush(fullHouse)).toBe(false);
  expect(Big2Engine.isFlush(fourOfAKind)).toBe(false);
  expect(Big2Engine.isFlush(royalFlush)).toBe(true);
});

test('identify fullHouses', () => {
  expect(Big2Engine.isFullHouse(straight)).toBe(false);
  expect(Big2Engine.isFullHouse(flush)).toBe(false);
  expect(Big2Engine.isFullHouse(fullHouse)).toBe(true);
  expect(Big2Engine.isFullHouse(fourOfAKind)).toBe(false);
  expect(Big2Engine.isFullHouse(royalFlush)).toBe(false);
});

test('identify four of a kinds', () => {
  expect(Big2Engine.isFourOfAKind(straight)).toBe(false);
  expect(Big2Engine.isFourOfAKind(flush)).toBe(false);
  expect(Big2Engine.isFourOfAKind(fullHouse)).toBe(false);
  expect(Big2Engine.isFourOfAKind(fourOfAKind)).toBe(true);
  expect(Big2Engine.isFourOfAKind(royalFlush)).toBe(false);
});

test('identify royal flushes', () => {
  expect(Big2Engine.isRoyalFlush(straight)).toBe(false);
  expect(Big2Engine.isRoyalFlush(flush)).toBe(false);
  expect(Big2Engine.isRoyalFlush(fullHouse)).toBe(false);
  expect(Big2Engine.isRoyalFlush(fourOfAKind)).toBe(false);
  expect(Big2Engine.isRoyalFlush(royalFlush)).toBe(true);
});

test('identify valid combinations', () => {
  expect(Big2Engine.validateCombination(single)).toBe(true);
  expect(Big2Engine.validateCombination(pair)).toBe(true);
  expect(Big2Engine.validateCombination(triplet)).toBe(true);
  expect(Big2Engine.validateCombination(straight)).toBe(true);
  expect(Big2Engine.validateCombination(flush)).toBe(true);
  expect(Big2Engine.validateCombination(fullHouse)).toBe(true);
  expect(Big2Engine.validateCombination(fourOfAKind)).toBe(true);
  expect(Big2Engine.validateCombination(royalFlush)).toBe(true);
});

test('identify invalid combinations', () => {
  // pairs
  expect(Big2Engine.validateCombination([Card(1, 1), Card(2, 1)])).toBe(false);

  // triplets
  expect(Big2Engine.validateCombination([Card(1, 1), Card(1, 2), Card(2, 1)])).toBe(false);

  // four
  expect(Big2Engine.validateCombination([Card(1, 1), Card(1, 2), Card(1, 3), Card(1, 4)])).toBe(false);

  // fives
  expect(Big2Engine.validateCombination([Card(1, 1), Card(2, 1), Card(3, 2), Card(4, 2), Card(6, 2)])).toBe(false);

  expect(Big2Engine.validateCombination([Card(1, 1), Card(2, 1), Card(3, 2), Card(4, 2), Card(6, 2), Card(7, 2)])).toBe(
    false,
  );
});

test('identify valid moves', () => {
  // singles
  expect(Big2Engine.validateMove([Card(13, 1)], [Card(1, 1)])).toBe(true);

  // pairs
  expect(Big2Engine.validateMove([Card(13, 1), Card(13, 2)], [Card(1, 1), Card(1, 2)])).toBe(true);

  // triplets
  expect(Big2Engine.validateMove([Card(13, 1), Card(13, 2), Card(13, 3)], [Card(1, 1), Card(1, 2), Card(1, 3)])).toBe(
    true,
  );

  // straights
  expect(
    Big2Engine.validateMove(
      [Card(3, 1), Card(4, 2), Card(5, 3), Card(6, 3), Card(7, 3)],
      [Card(2, 1), Card(3, 1), Card(4, 2), Card(5, 3), Card(6, 3)],
    ),
  ).toBe(true);
  expect(
    Big2Engine.validateMove(
      [Card(2, 1), Card(3, 2), Card(4, 3), Card(5, 4), Card(6, 4)],
      [Card(2, 2), Card(3, 1), Card(4, 2), Card(5, 3), Card(6, 3)],
    ),
  ).toBe(true);
  expect(
    Big2Engine.validateMove(
      [Card(10, 1), Card(11, 2), Card(12, 3), Card(13, 4), Card(1, 4)],
      [Card(11, 2), Card(12, 1), Card(13, 2), Card(1, 3), Card(2, 3)],
    ),
  ).toBe(true);

  // flushes
  expect(
    Big2Engine.validateMove(
      [Card(3, 1), Card(4, 1), Card(5, 1), Card(6, 1), Card(9, 1)],
      [Card(8, 2), Card(3, 2), Card(4, 2), Card(5, 2), Card(7, 2)],
    ),
  ).toBe(true);
  expect(
    Big2Engine.validateMove(
      [Card(10, 1), Card(11, 1), Card(12, 1), Card(13, 1), Card(1, 1)],
      [Card(2, 1), Card(3, 1), Card(4, 1), Card(5, 1), Card(7, 1)],
    ),
  ).toBe(true);

  // full houses
  expect(
    Big2Engine.validateMove(
      [Card(10, 1), Card(10, 2), Card(10, 3), Card(9, 1), Card(9, 2)],
      [Card(11, 1), Card(11, 2), Card(11, 3), Card(5, 1), Card(5, 2)],
    ),
  ).toBe(true);

  // four of a kind
  expect(
    Big2Engine.validateMove(
      [Card(10, 1), Card(10, 2), Card(10, 3), Card(10, 4), Card(9, 2)],
      [Card(11, 1), Card(11, 2), Card(11, 3), Card(11, 4), Card(5, 2)],
    ),
  ).toBe(true);

  // royal flush
  expect(
    Big2Engine.validateMove(
      [Card(3, 1), Card(4, 1), Card(5, 1), Card(6, 1), Card(7, 1)],
      [Card(3, 2), Card(4, 2), Card(5, 2), Card(6, 2), Card(7, 2)],
    ),
  ).toBe(true);
  expect(
    Big2Engine.validateMove(
      [Card(3, 1), Card(4, 1), Card(5, 1), Card(6, 1), Card(7, 1)],
      [Card(8, 1), Card(9, 1), Card(10, 1), Card(11, 1), Card(12, 1)],
    ),
  ).toBe(true);
});

test('identify invalid moves', () => {
  // singles
  expect(Big2Engine.validateMove([Card(1, 1)], [Card(13, 1)])).toBe(false);

  // pairs
  expect(Big2Engine.validateMove([Card(1, 1), Card(1, 2)], [Card(13, 1), Card(13, 2)])).toBe(false);

  // triplets
  expect(Big2Engine.validateMove([Card(1, 1), Card(1, 2), Card(1, 3)], [Card(13, 1), Card(13, 2), Card(13, 3)])).toBe(
    false,
  );

  // straights
  expect(
    Big2Engine.validateMove(
      [Card(2, 1), Card(3, 1), Card(4, 2), Card(5, 3), Card(6, 3)],
      [Card(3, 1), Card(4, 2), Card(5, 3), Card(6, 3), Card(7, 3)],
    ),
  ).toBe(false);
  expect(
    Big2Engine.validateMove(
      [Card(2, 2), Card(3, 1), Card(4, 2), Card(5, 3), Card(6, 3)],
      [Card(2, 1), Card(3, 2), Card(4, 3), Card(5, 4), Card(6, 4)],
    ),
  ).toBe(false);
  expect(
    Big2Engine.validateMove(
      [Card(11, 2), Card(12, 1), Card(13, 2), Card(1, 3), Card(2, 3)],
      [Card(10, 1), Card(11, 2), Card(12, 3), Card(13, 4), Card(1, 4)],
    ),
  ).toBe(false);

  // flushes
  expect(
    Big2Engine.validateMove(
      [Card(8, 2), Card(3, 2), Card(4, 2), Card(5, 2), Card(7, 2)],
      [Card(3, 1), Card(4, 1), Card(5, 1), Card(6, 1), Card(9, 1)],
    ),
  ).toBe(false);
  expect(
    Big2Engine.validateMove(
      [Card(2, 1), Card(3, 1), Card(4, 1), Card(5, 1), Card(7, 1)],
      [Card(10, 1), Card(11, 1), Card(12, 1), Card(13, 1), Card(1, 1)],
    ),
  ).toBe(false);

  // full houses
  expect(
    Big2Engine.validateMove(
      [Card(11, 1), Card(11, 2), Card(11, 3), Card(5, 1), Card(5, 2)],
      [Card(10, 1), Card(10, 2), Card(10, 3), Card(9, 1), Card(9, 2)],
    ),
  ).toBe(false);

  // four of a kind
  expect(
    Big2Engine.validateMove(
      [Card(11, 1), Card(11, 2), Card(11, 3), Card(11, 4), Card(5, 2)],
      [Card(10, 1), Card(10, 2), Card(10, 3), Card(10, 4), Card(9, 2)],
    ),
  ).toBe(false);

  // royal flush
  expect(
    Big2Engine.validateMove(
      [Card(3, 2), Card(4, 2), Card(5, 2), Card(6, 2), Card(7, 2)],
      [Card(3, 1), Card(4, 1), Card(5, 1), Card(6, 1), Card(7, 1)],
    ),
  ).toBe(false);
  expect(
    Big2Engine.validateMove(
      [Card(8, 1), Card(9, 1), Card(10, 1), Card(11, 1), Card(12, 1)],
      [Card(3, 1), Card(4, 1), Card(5, 1), Card(6, 1), Card(7, 1)],
    ),
  ).toBe(false);
});
