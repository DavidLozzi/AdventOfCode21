import React from 'react'
import input1 from './input1'
import Board from './board'

import './board.css'

const Day4 = () => {
  const [bingoNumbers, setBingoNumbers] = React.useState([])
  const [boards, setBoards] = React.useState([])
  const [winningBoard, setWinningBoard] = React.useState(null)
  const [lastBoard, setLastBoard] = React.useState(null)
  const [first, setFirst] = React.useState()
  const [second, setSecond] = React.useState()

  // get the input into boards
  React.useEffect(() => {
    const lines = input1.split('\n').map(v => v.trim())
    setBingoNumbers(lines.shift().split(',').map(v => parseInt(v))) // shift pulls the first row out of the array
    const _boards = []
    let board = { matchValue: 0, totalValue: 0, rows: [], columns: [], winning: false }
    lines.forEach((line, index) => {
      if (line.length === 0) { // line is empty, that ends this board
        if (board.rows.length > 0) {
          _boards.push(board)
        }
        board = { matchValue: 0, totalValue: 0, rows: [], columns: [], winning: false }
      } else {
        const rowVals = line.split(' ').filter(l => l).map(v => parseInt(v))
        const rowSum = rowVals.reduce((a, b) => a + b, 0)
        board.totalValue += rowSum // get the total value as we increment throw lines
        board.rows.push({ match: 0, line: rowVals })
        line
          .split(" ")
          .filter(a => a) // filter out empties, since there are multiple spaces in the lines
          .forEach((col, idx) => {
            const colNum = parseInt(col)
            if (board.columns[idx]) { // if the column exists on this board, append the column value to it
              board.columns[idx].line.push(colNum)
            } else { //column doesn't exist so create it
              board.columns[idx] =  { match: 0, line: [colNum] }
            }
        })
      }
    })
    _boards.push(board) // push the last one in

    console.log(_boards)
    setBoards(_boards)
  }, [])

  const deepClone = (obj) => {
    const str = JSON.stringify(obj)
    return JSON.parse(str)
  }
  // first challenge, find the winning board
  React.useEffect(() => {
    if (boards.length > 0) {
      console.warn('First Challenge')
      let _winningBoard = {}
      // let _winningBoard = {}
      const _boards = deepClone(boards)
      const _winningNum = bingoNumbers.find(num => {
        console.log('Number', num)
        return _boards.find(board => {
          let retVal = board.rows.find(row => {
            if (row.line.some(c => c === num)) {
              row.match += 1
              board.matchValue += num // collecting the matched values
              if (row.match === row.line.length) {
                console.log('WINNING ROW', row, board, num)
                _winningBoard = board
                return num
              }
            }
            return null
          })
          if (!retVal) {
            retVal = board.columns.find(col => {
              if (col.line.some(c => c === num)) {
                col.match += 1
                if (col.match === col.line.length) {
                  console.log('WINNING COLUMN', col, board, num)
                  _winningBoard = board
                  return num
                }
              }
            return null
            })
          }
          return retVal
        })
      })
      console.log('WINNER WINNER CHICKEN DINNER', _winningBoard)
      const unmarkedTotal = _winningBoard.totalValue - _winningBoard.matchValue
      console.log('unmarked total', unmarkedTotal)
      setFirst(unmarkedTotal * _winningNum)
      setWinningBoard(_winningBoard)
    }
  }, [bingoNumbers, boards])


  // second challenge, find the last winning board
  React.useEffect(() => {
    if (first && boards.length > 0) {
      console.warn('Second Challenge')
      let _winningBoard = {}
      const _boards = deepClone(boards)
      const _winningNum = bingoNumbers.find(num => {
        console.log('Number', num)
        console.log('remaining boards', _boards.filter(b => !b.winning).length)
        return _boards.filter(b => !b.winning).find(board => {
          let retVal = board.rows.find(row => {
            if (row.line.some(c => c === num)) {
              row.match += 1
              board.matchValue += num // collecting the matched values
              if (row.match === row.line.length) {
                console.log('WINNING ROW', row, board, num)
                if (_boards.filter(b => !b.winning).length === 1) { // last winning board!
                  _winningBoard = board
                  return num
                }
                board.winning = true
              }
            }
            return null
          })
          if (!retVal) {
            retVal = board.columns.find(col => {
              if (col.line.some(c => c === num)) {
                col.match += 1
                if (col.match === col.line.length) {
                  console.log('WINNING COLUMN', col, board, num)
                  if (_boards.filter(b => !b.winning).length === 1) {
                    _winningBoard = board
                    return num
                  }
                  board.winning = true
                }
              }
              return null
            })
          }
          return retVal
        })
      })
      console.log('WINNER WINNER CHICKEN DINNER', _winningBoard)
      const unmarkedTotal = _winningBoard.totalValue - _winningBoard.matchValue
      setLastBoard(_winningBoard)
      setSecond(unmarkedTotal * _winningNum)
    }
  }, [first, bingoNumbers, boards])

  return (
    <div className="day">
      <h2>Day 4 - Giant Squid</h2>
      <h2>Answer #1</h2>
      {first} Winning Board Final Score
      {winningBoard && <Board board={winningBoard} />}
      <h2>Answer #2</h2>
      {second} Last Winning Board Final Score
      {lastBoard && <Board board={lastBoard} />}
      <h3>Input: {input1.length} lines</h3>
      <div dangerouslySetInnerHTML={{ __html: input1.split('\n').join('<br/>') }} className="puzzle-input"></div>
    </div>
  );
}

export default Day4