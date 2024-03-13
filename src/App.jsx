import { useState } from "react"

import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];


function deriveActivePlayer(gameTurns){
  let currentPlayer= 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers]= useState({
    'X': 'Player 1',
    'O': 'Player 2'
  });

  const [gameTurns, setGameTurns] = useState([]); // gameTurns è, infine, l'unico elemento che comanda l'intero gioco

  // const [hasWinner, setHasWinner] = useState('false');
  // const [activePlayer, setActivePlayer] = useState('X');
  
  const activePlayer = deriveActivePlayer(gameTurns);

  // posso capire se un giocatore ha vinto dai dati di gameTurns, senza aggiungere nuovi State o logiche sconnesse da gameTurns

  let gameBoard = [...initialGameBoard.map(array => [...array])]; 
  // creo un nuovo array senza sovrascrivere quello precedente, quindi i dati non rimangono salvati nell'array iniziale e posso riavviare il gioco correttamente

  for (const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  } // -> si chiama: Deriving State

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol= gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol= gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol= gameBoard[combination[2].row][combination[2].column];

    if(
      firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol
      ){
        winner = players[firstSquareSymbol];
      }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns(prevTurns =>{
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{square:{row: rowIndex, col: colIndex}, player: currentPlayer},
      ...prevTurns];

      return updatedTurns;
    });
  }

  function handleRestartGame(){
    setGameTurns([]);
  }
    
  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers =>{
      return {
        ...prevPlayers,
         [symbol]: newName
      };
      })
  }

  return (<main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player 
        initialName='Player 1' 
        symbol='X' 
        isActive={activePlayer === 'X'}
        onChangeName={handlePlayerNameChange}
        />   
        <Player 
        initialName='Player 2' 
        symbol='O'   
        isActive={activePlayer === 'O'}
        onChangeName={handlePlayerNameChange}
        />
        
        
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestartGame}/>}
      <GameBoard onSelectSquare={handleSelectSquare} 
      board={gameBoard}
      />
    </div>
    <Log turns={gameTurns}/>  
  </main>
  );
}

export default App
