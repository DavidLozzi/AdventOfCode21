import React from 'react'
import input1 from './input1'

const Day14 = () => {
  const [puzzleInput, setPuzzleInput] = React.useState([]);
  const [template, setTemplate] = React.useState('')
  const [first, setFirst] = React.useState()
  const [second, setSecond] = React.useState()
  const [firstPolymer, setFirstPolymer] = React.useState()

  // get the input into a usable array
  React.useEffect(() => {
    const [_template, , ...puzzle] = input1.split('\n').map(v => v.trim())
    setTemplate(_template)
    setPuzzleInput(puzzle.map(p => {
      const [pair, insert] = p.split(' -> ')
      return { pair, insert }
    }))
  }, [])

  // first challenge, after inserting in 10 rounds, whats the highest common element less the lowest common element
  React.useEffect(() => {
    if (puzzleInput.length > 0) {
      let newPolymer = ''
      let lastPolymer = template
      for (let r = 0; r < 10; r++) {
        console.warn('round', r)
        newPolymer = lastPolymer.slice(0, 1)
        for (let i = 0; i < lastPolymer.length; i++) {
          if (i + 1 < lastPolymer.length) {
            const pair = lastPolymer.substring(i, i + 2)
            // console.log(i, pair)
            const element = puzzleInput.find(p => p.pair === pair).insert
            newPolymer += element + pair.slice(1)
          }
        }
        lastPolymer = newPolymer
      }
      const letters = lastPolymer.split('').reduce((a, b) => {
        if (a.indexOf(b) === -1) {
          return `${a}${b}`
        }
        return a
      }, '')

      let highCount = 0
      let lowCount = 0
      letters.split('').forEach(l => {
        const letterRegEx = new RegExp(`[${l}]`, 'ig')
        const count = lastPolymer.match(letterRegEx).length
        if (count > highCount) {
          highCount = count
        }
        if (count < lowCount || lowCount === 0) {
          lowCount = count
        }
      })
      setFirstPolymer(lastPolymer)
      setFirst(highCount - lowCount)
    }
  }, [template, puzzleInput])

  // second challenge, do it for 40 steps
  React.useEffect(() => {
    if (firstPolymer) {
      console.warn('second puzzle')
      const allPairs = []

      // change up approach because 40 times crushed it
      // using arrays
      // first get the first polymer, which is 10 iterations, into pairs
      for (let i = 0; i < firstPolymer.length; i++) {
        if (i + 1 < firstPolymer.length) {
          allPairs.push(firstPolymer.substring(i, i + 2))
        }
      }

      // loop through the puzzle 30 more times
      let lastPairs = [...allPairs]
      for (let r = 0; r < 30; r++) {
        console.warn('round', r)
        const newPairs = [...lastPairs]
        lastPairs.forEach(pair => {
          const element = puzzleInput.find(p => p.pair === pair).insert
          newPairs.push(element + pair.slice(1))
        })
        lastPairs = newPairs
      }

      setSecond('hi')
    }
  }, [firstPolymer, puzzleInput])

  return (
    <div className="day">
      <h2>Day 14 - Extended Polymerization</h2>
      <h2>Answer #1</h2>
      {first}
      <h2>Answer #2</h2>
      {second}
      <h3>Input: {puzzleInput.length} numbers</h3>
      <div dangerouslySetInnerHTML={{ __html: input1.split('\n').join('<br/>') }} className="puzzle-input"></div>
    </div>
  );
}

export default Day14