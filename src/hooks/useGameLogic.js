import { useState, useEffect } from 'react'

// in a hook (vs js function), you can access other react states and other react components

export const useGameLogic = (cardValues) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length-1; i>0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    // Shuffle Cards
    const shuffled = shuffleArray(cardValues);

    setCards(shuffled.map((value, index) => (
      {
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }
    )));

    setMoves(0);
    setScore(0);
    setMatchedCards([]);
    setFlippedCards([]);
    setIsLocked(false);
  };

  // usually we will run effect whenever the items within the array after is changed, but giving it an empty array will make it only run when the page is loaded
  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
    // dont allow clicking if card is already flipped or matched
    if (card.isFlipped || card.isMatched || isLocked || flippedCards.length === 2) {
      return;
    }
    
    // Update card flipped state
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return {...c, isFlipped: true };
      } else {
        return c;
      }
    });

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id]
    setFlippedCards(newFlippedCards);

    if (flippedCards.length == 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];
      if (firstCard.value === card.value){
        // prev is the current state of matchedCards
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          setScore((prev) => prev+1);
          setCards((prev) => 
            prev.map((c) => {
              if (c.id === card.id || c.id == firstCard.id) {
                return {...c, isMatched: true };
              } else {
                return c;
              }
          }));
          setFlippedCards([]);
          setIsLocked(false);
        }, 500); //0.5s
      } else {
        // flip back card 1 and 2
        
        // allows us to run a function after a certain amount of time
        setTimeout(() => {
          const flippedBackCard = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return {...c, isFlipped: false};
            } else {
              return c;
            }
          });
          setCards(flippedBackCard)

          setFlippedCards([]);
          setIsLocked(false);
        }, 1000); // delay of 1 sec (1000ms)
      }
      setMoves((prev) => prev+1);
    }
  };

  const isGameComplete = matchedCards.length === cardValues.length;

  return {cards, score, moves, isGameComplete, initializeGame, handleCardClick};
}