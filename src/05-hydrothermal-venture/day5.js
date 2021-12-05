import React from 'react'
import input1 from './input1';

const Day5 = () => {
  const [puzzleInput, setPuzzleInput] = React.useState([]);
  const [first, setFirst] = React.useState()
  const [second, setSecond] = React.useState()

  // get the input into a usable array of coordinates
  React.useEffect(() => {
    setPuzzleInput(input1.split('\n').map(v => {
      const [startStr, endStr] = v.trim().split(' -> ')
      const [x1, y1] = startStr.split(',')
      const [x2, y2] = endStr.split(',')
      return {
        start: { x: parseInt(x1), y: parseInt(y1) },
        end: { x: parseInt(x2), y: parseInt(y2)}
      }
    }))
  }, [])

  // first challenge, find overlapping coordinates in straight lines
  React.useEffect(() => {
    if (puzzleInput.length > 0) {
      console.log(puzzleInput)
      const allCoords = new Map() // using a map to easily collect counts per coordinate
      puzzleInput.forEach(coord => {
        if (coord.start.x === coord.end.x || coord.start.y === coord.end.y) { // only focusing on straight lines, so either x or y must match
          if (coord.start.x !== coord.end.x) {
            // want to start w/ the lower of the two numbers, and end with the higher of the two
            const start = coord.start.x > coord.end.x ? coord.end.x : coord.start.x
            const stop = coord.start.x < coord.end.x ? coord.end.x : coord.start.x
            for (let i = start; i <= stop; i++) {
              const newCoord = { x: i, y: coord.start.y }
              const newCoordStr = JSON.stringify(newCoord)
              let curr = 1
              if (allCoords.has(newCoordStr)) { // if this coord exists, add to it
                curr = allCoords.get(newCoordStr) + 1
              }
              allCoords.set(newCoordStr, curr)
            }
          }
          if (coord.start.y !== coord.end.y) {
            const start = coord.start.y > coord.end.y ? coord.end.y : coord.start.y
            const stop = coord.start.y < coord.end.y ? coord.end.y : coord.start.y
            for (let i = start; i <= stop; i++) {
              const newCoord = { x: coord.start.x, y: i }
              const newCoordStr = JSON.stringify(newCoord)
              let curr = 1
              if (allCoords.has(newCoordStr)) {
                curr = allCoords.get(newCoordStr) + 1
              }
              allCoords.set(newCoordStr, curr)
            }
          }
        }
      })
      let countOver1 = 0
      allCoords.forEach((value, key) => { // find all the ones where the count is over 1
        if (value > 1) {
          countOver1 += 1
        }
      })
      setFirst(countOver1)
    }
  }, [puzzleInput])

  // second challenge, now include oords that overlap with diagnols
  React.useEffect(() => {
    if (first) {
      const allCoords = new Map()
      puzzleInput.forEach(coord => {
          if (coord.start.x !== coord.end.x && coord.start.y === coord.end.y) {
            // want to start w/ the lower of the two numbers, and end with the higher of the two
            const start = coord.start.x > coord.end.x ? coord.end.x : coord.start.x
            const stop = coord.start.x < coord.end.x ? coord.end.x : coord.start.x
            for (let i = start; i <= stop; i++) {
              const newCoord = { x: i, y: coord.start.y }
              const newCoordStr = JSON.stringify(newCoord)
              let curr = 1
              if (allCoords.has(newCoordStr)) {
                curr = allCoords.get(newCoordStr) + 1
              }
              allCoords.set(newCoordStr, curr)
            }
          }
          if (coord.start.y !== coord.end.y && coord.start.x === coord.end.x) {
            const start = coord.start.y > coord.end.y ? coord.end.y : coord.start.y
            const stop = coord.start.y < coord.end.y ? coord.end.y : coord.start.y
            for (let i = start; i <= stop; i++) {
              const newCoord = { x: coord.start.x, y: i }
              const newCoordStr = JSON.stringify(newCoord)
              let curr = 1
              if (allCoords.has(newCoordStr)) {
                curr = allCoords.get(newCoordStr) + 1
              }
              allCoords.set(newCoordStr, curr)
            }
          }
          // drawing diagonal
          if (coord.start.x !== coord.end.x && coord.start.y !== coord.end.y) {
            const startx = coord.start.x > coord.end.x ? coord.end.x : coord.start.x
            const stopx = coord.start.x < coord.end.x ? coord.end.x : coord.start.x
            const total = stopx - startx // getting the total distance of 1 coord, since it's a 45º angle, it'll be the same for x and y
            for (let i = 0; i <= total; i++) {
              const newx = coord.start.x > coord.end.x ? coord.start.x - i : coord.start.x + i // handle increase or decrease depending if we're starting low or high
              const newy = coord.start.y > coord.end.y ? coord.start.y - i : coord.start.y + i
              const newCoord = { x: newx, y: newy }
              const newCoordStr = JSON.stringify(newCoord)
              let curr = 1
              if (allCoords.has(newCoordStr)) {
                curr = allCoords.get(newCoordStr) + 1
              }
              allCoords.set(newCoordStr, curr)
            }
          }
        
      })
      let countOver1 = 0
      allCoords.forEach((value, key) => {
        if (value > 1) {
          countOver1 += 1
        }
      })
      setSecond(countOver1)
    }
  }, [first, puzzleInput])

  return (
    <div className="day">
      <h2>Day 5 - Hydrothermal Venture</h2>
      <h2>Answer #1</h2>
      {first} overlaps (straight lines)
      <h2>Answer #2</h2>
      {second} overlaps (including diagonals)
      <h3>Input: {puzzleInput.length} numbers</h3>
      <div dangerouslySetInnerHTML={{ __html: input1.split('\n').join('<br/>') }} className="puzzle-input"></div>
    </div>
  );
}

export default Day5