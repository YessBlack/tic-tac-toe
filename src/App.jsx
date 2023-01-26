import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({children, updateBoard, index, isSelected}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  
  const handleClick = () => {
    updateBoard(index)
  }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {
  const [board, setBoard ] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    // revisar las combinaciones ganadoras
    // Checkear si x u O gano
    for(const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if(boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]
        ){
          return boardToCheck[a]
        }
      }
      // Si no hay ganador
      return null
  }

  const updateBoard = (index) => {
    // No actualizar posicion 
    // Si ya tiene algo
    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Revisar si hay ganador

    const newWinner = checkWinner(newBoard)
      setWinner(newWinner)
      if(newWinner) {
        alert(`el ganador es ${newWinner}`)
      }
  }



  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <section className='game'>  
        {
          board.map((_, index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>

      </section>
    </main>
  )
}

export default App
