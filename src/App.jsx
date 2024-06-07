import { useState } from "react";
import GameOver from "./components/GameOver";
import GameBoard from "./components/gameBoard";
import Log from "./components/log";
import Player from "./components/player";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
    X : 'Player 1' ,
    O : 'Player 2'
};

    const initialGameBoard = [
        [null , null , null ],
        [null , null , null ],
        [null , null , null ]
    ];

  function deriveActivePlayer(gameTurns){

    let currentPlayer = 'X' ;

    if(gameTurns.length > 0 && gameTurns[0].player ==='X'){
      currentPlayer ='O' ;
    }
    return currentPlayer ;

  }
  //above is the helper function to set active player !

  function deriveWinner(gameBoard , players){

    let Winner ; 

    for(const combination of WINNING_COMBINATIONS){

     const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
     const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
     const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
 
     if(
       firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol
     ){
         Winner = players[firstSquareSymbol] ;
     }
    }
    return Winner ;

  }

  function deriveGameBoard(gameTurns){

    let gameBoard = [...initialGameBoard.map(array => [...array])] ;// need to make a new bran array by deep copying it because for restart or rematch we need to get a new empty array for rematch 

    for(const turn of gameTurns ){
        
        const {square , player} = turn ;
        
        const {row , col} = square ; 
 
        gameBoard[row][col] = player ;
    }

    return gameBoard ;

  }

function App() {

  const [players , setPlayers] = useState(PLAYERS);
  
  //  const [activePlayer , setActivePlayer] =  useState('X'); //ancestor App.jsx passes its state values to children components via props

   const[gameTurns , setGameTurns] = useState([]) ;

   //above line-20 : instead of using useState code use line 25 ==> 
   const activePlayer = deriveActivePlayer(gameTurns) ;

   const gameBoard = deriveGameBoard(gameTurns);

   const Winner = deriveWinner(gameBoard , players);
   const hasDraw = gameTurns.length=== 9 && !Winner ;

   function handleSelectSquare(rowIndex , colIndex){

      // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X'); // switches active player

      setGameTurns((prevTurns) => {   //to display logs in the game

        // let currentPlayer = 'X' ;

        // if(prevTurns.length > 0 && prevTurns[0].player ==='X'){
        //   currentPlayer ='O' ;
        // }

          //above code(29-33) : instead of using above code use line 35 ==>
          const currentPlayer =  deriveActivePlayer(prevTurns) ;

          const updatedTurns = [
            { square: {row : rowIndex , col: colIndex} , player : currentPlayer },
             ...prevTurns ,
          ];

          return updatedTurns ;
      })
   }

   function handleRestart(){
    setGameTurns([]) ;
   }

   function handleNameChange(symbol , newName){
    setPlayers(prevPlayers  =>{
      return {
        ...prevPlayers, 
        [symbol]: newName
      };
    });
   }

  return (
   <main>
    <div id="game-container">
  
      <ol id="players" className="highlight-player"> 
      
        {/* PLAYERS */}

        <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer==='X'} onChangeName={handleNameChange}></Player>
                          {/* above line : activePlayer returns true to player.jsx if its equal to X or O  */}
    
        <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer==='O'}></Player>

      </ol>

        {(Winner || hasDraw ) &&  <GameOver winner= {Winner} onRestart={handleRestart}></GameOver>}

      {/* GAME BOARD */}

      <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol = {activePlayer} board={gameBoard}></GameBoard>
                          {/* activePlayerSymbol returns the symbol X or O to GameBoard.jsx  */}
                          {/* onSelectSquare returns the active player to GAmeBorad.jsx  */}
                          {/* ancestor App.jsx passes its usestate values to children components via props */}
    </div>   
      <Log turns = {gameTurns} ></Log>
   </main>
  );
}

export default App
