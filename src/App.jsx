import { GameHeader } from './components/GameHeader'
import { Card } from './components/Card';
import { useGameLogic } from './hooks/useGameLogic';

// const cardValues = ["☻","♥","♦","♣","♠","♪","♫","☼","☻","♥","♦","♣","♠","♪","♫","☼"];
const cardValues = ["🦁","🐯","🦝","🐷","🐮","🐻‍❄️","🐸","🐻","🦁","🐯","🦝","🐷","🐮","🐻‍❄️","🐸","🐻"]
function App() {
  const {cards, score, moves, isGameComplete, initializeGame, handleCardClick} = useGameLogic(cardValues);

  return <div className="app">
    <GameHeader score={score} moves={moves} onReset={initializeGame}/>
    {isGameComplete && <WinMessage moves={moves}/>}
    <div className="cards-grid">
      {cards.map((card) => (
        <Card card={card} onClick={handleCardClick}></Card>
      ))}
    </div>
  </div>
};

export default App;
