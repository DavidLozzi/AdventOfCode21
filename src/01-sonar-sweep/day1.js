import React from 'react'
import input1 from './input1';

const Day1 = () => {  
  const [puzzleInput, setPuzzleInput] = React.useState([]);
  const [first, setFirst] = React.useState()
  const [second, setSecond] = React.useState()
  
  // get the input into a usable array
  React.useEffect(() => {
    setPuzzleInput(input1.split('\n').map(v => v.trim()))
  }, [])

  // first challenge, find how many times the number increases from the number before it
  React.useEffect(() => {
    setFirst(puzzleInput.reduce((total, current, index) => {
      console.log('first', index, current)
      if (index > 0) {
        if (current > parseInt(puzzleInput[index - 1])) {
          return total + 1
        }
      }
      return total
    }, 0))
  }, [puzzleInput])

  // second challenge, find how many times the three-measurement window increases
  React.useEffect(() => {
    setSecond(puzzleInput.reduce((total, current, index) => {
      console.log('second', index, current)
      if (index > 0) {
        // get the current sliding measurement, including current plus the next two
        const currentMeasure = parseInt(puzzleInput[index]) + parseInt(puzzleInput[index + 1]) + parseInt(puzzleInput[index + 2])
        // get the previous sliding measurement, starting at the previous record plus the next two
        const previousMeasure = parseInt(puzzleInput[index - 1]) + parseInt(puzzleInput[index]) + parseInt(puzzleInput[index + 1])
        if (currentMeasure > previousMeasure) {
          return total + 1
        }
      }
      return total
    }, 0))
  }, [puzzleInput])

  return (
    <div >
      <h2>Day 1 - Sonar Sweep</h2>
      <h3>Input: {puzzleInput.length} numbers</h3>
      <div dangerouslySetInnerHTML={{ __html: puzzleInput.join('<br/>') }} className="puzzle-input"></div>
      <h2>Answer #1</h2>
      {first}
      <h2>Answer #2</h2>
      {second}
    </div>
  );
}

export default Day1