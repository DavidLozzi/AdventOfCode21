import React from 'react'
import input1 from './input1'

const Day7 = () => {
  const [puzzleInput, setPuzzleInput] = React.useState([]);
  const [first, setFirst] = React.useState()
  const [second, setSecond] = React.useState()

  // get the input into a usable array
  React.useEffect(() => {
   setPuzzleInput(input1.split(',').map(v => parseInt(v.trim())).sort((a, b) => a - b))
  }, [])

  // first challenge, find the best number for fuel
  // code referenced from https://www.reddit.com/r/adventofcode/comments/rar7ty/comment/hnl0czm/?utm_source=share&utm_medium=web2x&context=3
  React.useEffect(() => {
    if (puzzleInput.length > 0) {
      let x = puzzleInput.length
      // not sure what the right shift is doing >> and why this works
      const mean = (puzzleInput[x >> 1] + puzzleInput[--x >> 1]) / 2
      const answer = puzzleInput.reduce((y, x) => {
        const b = x - mean;
        return y += b < 0 ? -b : b
      }, 0)

      setFirst(answer)
    }
  }, [puzzleInput])

  // second challenge, oopsie, we didn't know how they burned fuel, fing the new best number
  // code referenced from https://github.com/northflank/adventofcode2021/blob/main/day7-task2.js
  React.useEffect(() => {
    if (puzzleInput.length > 0) {
      const getMedian = () => {
        return puzzleInput.slice().sort((a, b) => a - b)
        [Math.floor(puzzleInput.length / 2)];
      }
      const crabFuel = (start, end) => {
        let crabFuel = 0
        for (let i = 0; i <= Math.abs(start - end); i++)
            crabFuel += i
        return crabFuel
      }
      const totalFuel = (position) => {
        return puzzleInput.reduce((a, b) => a + crabFuel(b, position), 0)
      }
      const getFuel = (position, prevResult) => {
        let result = totalFuel(position)
        if (!prevResult || result < prevResult) {
          return getFuel(position + 1, result)
        } else {
          return prevResult
        }
      }
      setSecond(getFuel(getMedian()))
    }
  }, [puzzleInput])

  return (
    <div className="day">
      <h2>Day 7 - Treachery of Whales</h2>
      <h2>Answer #1</h2>
      {first}
      <h2>Answer #2</h2>
      {second}
      <h3>Input: {puzzleInput.length} numbers</h3>
      <div dangerouslySetInnerHTML={{ __html: puzzleInput.join('<br/>') }} className="puzzle-input"></div>
    </div>
  );
}

export default Day7