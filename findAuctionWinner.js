function findWinner(bids, reservePrice) {
  // Initialize variables for the winning buyer and the winning price
  let winningBuyer = null;
  let winningPrice = null;

  const numberOfBidders = Object.keys(bids).length;

  if (numberOfBidders === 0) return { winningBuyer, winningPrice };

  // Iterate over each buyer's bids
  for (const buyer in bids) {
    // Check if the buyer has placed any bids
    if (bids[buyer].length > 0) {
      // Find the highest bid price for this buyer
      const highestBid = Math.max(...bids[buyer]);
      // Check if the highest bid price is above or equal to the reserve price
      if (highestBid >= reservePrice) {
        // Check if this is the first winning buyer or if the bid price is higher than the current winning price
        if (winningBuyer === null || highestBid > winningPrice) {
          // Set this buyer as the new winning buyer and set the bid price as the new winning price
          winningBuyer = buyer;
          winningPrice = highestBid;
        }
      }
    }
  }

  // If there is a winning buyer, find the second highest bid price and set it as the winning price
  if (winningBuyer !== null) {
    // returns winning buyer and price when there is only one bidder
    if (numberOfBidders === 1) {
      return { winningBuyer, winningPrice };
    }

    const bidsCopyWithoutWinner = { ...bids };
    delete bidsCopyWithoutWinner[winningBuyer];

    const allBids = Object.values(bidsCopyWithoutWinner).flat();
    const secondHighestBid = Math.max(
      ...allBids.filter((x) => x !== winningPrice),
    );
    winningPrice =
      secondHighestBid > reservePrice ? secondHighestBid : reservePrice;
  }

  // Log the winning buyer and the winning price
  console.log(
    `The winning buyer is ${winningBuyer} with a winning price of ${winningPrice} euros.`,
  );

  return { winningBuyer, winningPrice };
}

module.exports = findWinner;
