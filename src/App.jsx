import { useState, useEffect } from 'react'
import { GameHeader } from './components/GameHeader'
import { Card } from './components/Card';

// const cardValues = ["☻","♥","♦","♣","♠","♪","♫","☼","☻","♥","♦","♣","♠","♪","♫","☼"];
const cardValues = ["🦁","🐯","🦝","🐷","🐮","🐻‍❄️","🐸","🐻","🦁","🐯","🦝","🐷","🐮","🐻‍❄️","🐸","🐻"]
function App() {

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);


  const initializeGame = () => {
    // Shuffle Cards

    setCards(cardValues.map((value, index) => (
      {
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }
    )));
  };

  // usually we will run effect whenever the items within the array after is changed, but giving it an empty array will make it only run when the page is loaded
  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
    // dont allow clicking if card is already flipped or matched
    if (card.isFlipped || card.isMatched) {
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
      const firstCard = cards[flippedCards[0]];
      if (firstCard.value === card.value){
        // prev is the current state of matchedCards
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);

          setCards((prev) => 
            prev.map((c) => {
              if (c.id === card.id || c.id == firstCard.id) {
                return {...c, isMatched: true };
              } else {
                return c;
              }
          }));
          setFlippedCards([]);
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
        }, 1000); // delay of 1 sec (1000ms)

        
      }
    }
  };

  return <div className="app">
    <GameHeader score={3} moves={1}/>

    <div className="cards-grid">
      {cards.map((card) => (
        <Card card={card} onClick={handleCardClick}></Card>
      ))}
    </div>
  </div>;
};

export default App;
