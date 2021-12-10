import React from 'react'
import input1 from './input1'

const Day10 = () => {
  const [puzzleInput, setPuzzleInput] = React.useState([]);
  const [first, setFirst] = React.useState()
  const [second, setSecond] = React.useState()
  const pairs = React.useMemo(() => [
    {
      open: '(',
      close: ')',
      value: 3,
      value2: 1 // part 2 points
    },
    {
      open: '[',
      close: ']',
      value: 57,
      value2: 2
    },
    {
      open: '{',
      close: '}',
      value: 1197,
      value2: 3
    },
    {
      open: '<',
      close: '>',
      value: 25137,
      value2: 4
    }
  ], [])

  // get the input into a usable array
  React.useEffect(() => {
   setPuzzleInput(input1.split('\n').map(v => v.trim()))
  }, [])

  // first challenge, find incorrectly matched closing characters
  React.useEffect(() => {
    if (puzzleInput.length > 0) {
      const invalids = []
      puzzleInput.forEach(input => {
        const opens = []
        const chars = input.split('')
        chars.some(c => {
          if (pairs.some(p => p.open === c)) {
            opens.push(c)
          } else {
            const pair = pairs.find(p => p.close === c)
            const lastOpen = opens.splice(-1)[0]
            if (pair.open !== lastOpen) {
              console.warn('bad character', c, 'in', input)
              invalids.push(c)
              return true
            }
          }
          return false
        })
      })

      const points = invalids.reduce((a, b) => a + pairs.find(p => p.close === b).value, 0)
      setFirst(points)
    }
  }, [puzzleInput, pairs])

  // second challenge, complete the valid lines
  React.useEffect(() => {
    if (first) {
      console.warn('second puzzle')
      const scores = []
      puzzleInput.forEach(input => {
        const opens = []
        const chars = input.split('')
        const isInvalidInput = chars.some(c => {
          if (pairs.some(p => p.open === c)) {
            opens.push(c)
          } else {
            const pair = pairs.find(p => p.close === c)
            const lastOpen = opens.splice(-1)[0] // take out the last open because we have its close
            if (pair.open !== lastOpen) { // if doesn't match, this input line is junk
              console.log('invalid line', input)
              return true
            }
          }
          return false
        })
        if(!isInvalidInput) {
          if (opens.reverse().length > 0) {
            let total = 0
            opens.forEach(o => {
              total = total * 5
              total += pairs.find(p => p.open === o).value2
            })
            console.log(opens.join(), 'total score', total)
            scores.push(total)
          } else {
            console.warn('no opens remain?', input) // validator, hope it doens't hit
          }
        }
      })
      setSecond(scores.sort((a,b) => a-b)[Math.floor(scores.length / 2)])
    }
  }, [first, puzzleInput, pairs])

  return (
    <div className="day">
      <h2>Day 10 - Syntax Scoring</h2>
      <h2>Answer #1</h2>
      {first}
      <h2>Answer #2</h2>
      {second}
      <h3>Input: {puzzleInput.length} numbers</h3>
      <div dangerouslySetInnerHTML={{ __html: puzzleInput.join('<br/>') }} className="puzzle-input"></div>
    </div>
  );
}

export default Day10