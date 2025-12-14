import { useState } from 'react'
import { GameHeader } from './components/GameHeader'
import { Card } from './components/Card';

// const cardValues = ["☻","♥","♦","♣","♠","♪","♫","☼","☻","♥","♦","♣","♠","♪","♫","☼"];
const cardValues = ["🦁","🐯","🦝","🐷","🐮","🐻‍❄️","🐸","🐻","🦁","🐯","🦝","🐷","🐮","🐻‍❄️","🐸","🐻"]
function App() {

  return <div className="app">
    <GameHeader score={3} moves={1}/>

    <div className="cards-grid">
      {cardValues.map((card) => (
        <Card card={card}></Card>
      ))}
    </div>
  </div>;
}

export default App;
