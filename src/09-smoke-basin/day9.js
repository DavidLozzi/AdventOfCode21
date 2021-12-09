import React from 'react'
import input1 from './input1'

import './valleys.css'

const Day9 = () => {
  const [puzzleInput, setPuzzleInput] = React.useState([]);
  const [first, setFirst] = React.useState()
  const [second, setSecond] = React.useState()

  // get the input into a usable array
  React.useEffect(() => {
   setPuzzleInput(input1.split('\n').map(v => v.trim().split('')))
  }, [])

  // first challenge, find the low points in life... er... the caves
  React.useEffect(() => {
    if (puzzleInput.length > 0) {
      console.warn("puzzle 1")
      const lowPoints = []
      puzzleInput.forEach((row, rindex) => {
        row.forEach((p, pindex) => {
          const aboveRow = puzzleInput[rindex - 1]
          let up = p + 1
          if (aboveRow) {
            up = aboveRow[pindex]
          }
          const right = row[pindex + 1] || p + 1
          const belowRow = puzzleInput[rindex + 1]
          let down = p + 1
          if (belowRow) {
            down = belowRow[pindex]
          }
          const left = row[pindex - 1] || p + 1

          console.log(p, "<", up, right, down, left)

          if (p < up && p < right && p < down && p < left) {
            console.log("^ low point")
            lowPoints.push(p)
          }
        })
      })
      console.log(lowPoints)
      const riskLevel = lowPoints.reduce((a, b) => a + parseInt(b) + 1, 0)
      setFirst(riskLevel)
    }
  }, [puzzleInput])

  // second challenge, find the 3 largest basins
  const [loadingSecond, setLoadingSecond] = React.useState(true)
  React.useEffect(() => {
    if (first) {
      console.warn('second puzzle')
      const peaksValleys = input1.replace(/[0-8]/ig, 1).replace(/9/ig, 0)
      console.log(peaksValleys)
      const newInput = peaksValleys.split('\n').map(v => v.trim().split('').map(p => parseInt(p)))
      const pointsCovered = []
      const valleys = []

      const findFullValleySize = (rowIndex, colIndex) => {
        console.log('sizing', rowIndex, colIndex)
        if (newInput[rowIndex] && newInput[rowIndex][colIndex] && !pointsCovered.some(c => c === `${rowIndex},${colIndex}`)) {
          console.log('value at', rowIndex, ',', colIndex, '=', newInput[rowIndex][colIndex])
          pointsCovered.push(`${rowIndex},${colIndex}`)
          let valleySize = 1
          //go up
          valleySize += findFullValleySize(rowIndex - 1, colIndex)
          //go right
          valleySize += findFullValleySize(rowIndex, colIndex + 1)
          //go down
          valleySize += findFullValleySize(rowIndex + 1, colIndex)
          //go left
          valleySize += findFullValleySize(rowIndex, colIndex - 1)
          return valleySize
        } else {
          console.log('hit a peak')
          return 0
        }
      }

      newInput.forEach((row, rindex) => {
        row.forEach((p, pindex) => {
          if (!pointsCovered.some(c => c === `${rindex},${pindex}`)) {
            if (p) { // p === 1
              valleys.push(findFullValleySize(rindex, pindex))
              console.log('new valley')
            } else { // p === 0
              //its a 9, a peak, so ignore it and the next non-9 will be a new valley
              pointsCovered.push(`${rindex},${pindex}`)
            }
          }
        })
      })
      const threeLargestSizes = valleys.sort((a,b) => b - a).filter((v,i) => i < 3).reduce((a,b) => a * b, 1)
      setSecond(threeLargestSizes)
      setLoadingSecond(false)
    }
  }, [first, puzzleInput])

  return (
    <div className="day">
      <h2>Day 9 - Smoke Basin</h2>
      <h2>Answer #1</h2>
      {first}
      <h2>Answer #2</h2>
      {loadingSecond && <span>Loading... this will only take a moment</span>}
      {!loadingSecond &&
          <span>{second}</span>
      }
      <h3>Input: {puzzleInput.length} numbers</h3>
      <div>
        <div className="valleyRow" style={{marginBottom: '15px'}}>
          Low {[0,1,2,3,4,5,6,7,8,9].map(v => <div className="valleyCell" key={v} style={{ backgroundColor: `rgb(24, 72, 121, 0${1 - (v * .1)})`}}/>)} High
        </div>
        {puzzleInput.map((row, index) => <div className="valleyRow" key={index}>
          {row.map(p => <div className="valleyCell" key={`${index}-${p}`} style={{ backgroundColor: `rgb(24, 72, 121, 0${1 - (p * .1)})`}}></div>)}
        </div>
        )}
      </div>
    </div>
  );
}

export default Day9