import React from 'react'
import input1 from './input1';

const Day2 = () => {
  const puzzleInput = input1.split('\n').map(v => v.trim())

  const [first, setFirst] = React.useState()
  const [second, setSecond] = React.useState()

  // first challenge, ...
  React.useEffect(() => {
    setFirst(puzzleInput)
  }, [puzzleInput])

  // second challenge, ...
  React.useEffect(() => {
    setSecond()
  }, [puzzleInput])

  return (
    <div>
      <h2>Day 2 - Dive</h2>
      <h3>Input: {puzzleInput.length} numbers</h3>
      <div dangerouslySetInnerHTML={{ __html: puzzleInput.join('<br/>') }} className="puzzle-input"></div>
      <h2>Answer #1</h2>
      {first}
      <h2>Answer #2</h2>
      {second}
    </div>
  );
}

export default Day2