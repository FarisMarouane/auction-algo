const findWinnerAndWinningPrice = require('./findAuctionWinner');

// Define the reserve price
const reservePrice = 100;

describe('findWinnerAndWinningPrice', () => {
  test('returns null when no bids are placed', () => {
    const result = findWinnerAndWinningPrice({}, reservePrice);
    expect(result).toEqual({ winningBuyer: null, winningPrice: null });
  });

  test('returns null when all bids are below reserve price', () => {
    const bids = {
      A: [50, 75, 80],
      B: [60, 70],
      C: [85, 90],
    };
    const result = findWinnerAndWinningPrice(bids, reservePrice);
    expect(result).toEqual({ winningBuyer: null, winningPrice: null });
  });

  test('returns winning buyer and price when there is only one bidder', () => {
    const bids = {
      A: [110, 125, 130],
    };
    const result = findWinnerAndWinningPrice(bids, reservePrice);
    expect(result).toEqual({ winningBuyer: 'A', winningPrice: 130 });
  });

  test('returns winning buyer and price when there are multiple bidders', () => {
    const bids = {
      A: [110, 130],
      B: [120],
      C: [125],
      D: [105, 115, 90],
      E: [132, 135, 140],
    };
    const result = findWinnerAndWinningPrice(bids, reservePrice);
    expect(result).toEqual({ winningBuyer: 'E', winningPrice: 130 });
  });
});
