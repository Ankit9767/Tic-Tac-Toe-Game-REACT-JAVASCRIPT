// import React from 'react';

//     const initialGameBoard = [
//         [null , null , null ],
//         [null , null , null ],
//         [null , null , null ]
//     ];

export default function GameBoard({onSelectSquare , board }) {

    // let gameBoard = initialGameBoard ;

    // for(const turn of turns ){
        
    //     const {square , player} = turn ;
        
    //     const {row , col} = square ; 

    //     gameBoard[row][col] = player ;

        //line 12 to line 20 code is called  ==> derived state (gameboard is some value which is computed from a derived state called gameturns)
    // }

//    const [gameBoard , setGameBoard] = useState(initialGameBoard);

//    function handleSelectSquare(rowIndex , colIndex){
//     setGameBoard((prevGameBoard) => {

//         const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])] ;
//             updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol ; //activeplayer symbol which we get from app.jsx  will get updated here on the box
//             return updatedGameBoard ;
//     });
//     onSelectSquare() ;
//    }

  return <ol id='game-board'>
    {board.map((row , rowIndex) => <li key={rowIndex}>

        <ol>
            {row.map((playerSymbol , colIndex) => 
                <li key={colIndex}><button onClick={ () => onSelectSquare(rowIndex , colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button></li>)}
        </ol>

    </li>)}
  </ol>
}
