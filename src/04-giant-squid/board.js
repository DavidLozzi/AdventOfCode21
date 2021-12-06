import React from 'react';

const Board = ({ board, numbers, winningNumber }) => {
  const [playedNumbers, setPlayedNumbers] = React.useState([])
  const [currentNumber, setCurrentNumber] = React.useState()

  const play = () => {
    let counter = 0
    const playGame = () => {
      setTimeout(() => {
        if (numbers[counter]) {
          playedNumbers.push(numbers[counter])
          setCurrentNumber(numbers[counter])
          setPlayedNumbers(playedNumbers)
          counter += 1
          console.log('played', numbers[counter])
          if (numbers[counter-1] !== winningNumber) {
            playGame()
          }
        }
      }, 500)
    }
    playGame()
  }

  return <div className="board-wrapper">
    <button className="smaller" onClick={play}>Play</button>
    <div>
      {currentNumber !== winningNumber && currentNumber}
      {currentNumber === winningNumber && <span className='bingo'>Bingo!</span>}
    </div>
    <div className="played-numbers">
      {playedNumbers.map(num => <div className="played-num">{num}</div>)}
    </div>
    <div className="board">
    <div className="title">Bingo</div>
    {board.rows.map(row => 
      <div className="row">
        {row.line.map(col => 
          <div className="col">
            <div className={`bingo-chip ${playedNumbers.some(n => n === col) ? 'match' : ''}`} />
            {col}
          </div>
        )}
      </div>
    )}
  </div>
  </div>
}

export default Board