export function shuffle(cards) {
  const newCardsArray = [...cards];
  let current = newCardsArray.length;

  while (current !== 0) {
    const randomIndex = Math.floor(Math.random() * current);
    current--;
    // swap
    [newCardsArray[current], newCardsArray[randomIndex]] = [
      newCardsArray[randomIndex],
      newCardsArray[current],
    ];
  }

  return newCardsArray;
}

export default shuffle;
