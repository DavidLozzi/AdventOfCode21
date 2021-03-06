import React from 'react'
import input1 from './input1'
import './fish.css'

const Day6 = () => {
  const [puzzleInput, setPuzzleInput] = React.useState([]);
  const [first, setFirst] = React.useState()
  const [fishList, setFishList] = React.useState([])
  const [showFish, setShowFish] = React.useState(false)
  const [day, setDay] = React.useState(0)
  const [stopped, setStopped] = React.useState(false)
  const [second, setSecond] = React.useState()

  const play = () => {
    setShowFish(true);
    setStopped(false)
    const daysToRun = 80
    let fishies = [...puzzleInput]
    let days = 0

    const loadFish = () => {
      setTimeout(() => {
        console.log('making fish')
        const newFishes = []
        fishies.forEach(fish => {
          let newAge = fish - 1
          if (newAge === -1) {
            newFishes.push(6) // reset this fish
            newFishes.push(8) // spawn a new fish
          } else {
            newFishes.push(newAge) // aging fish, push it in
          }
        })
        setFishList(newFishes)
        fishies = newFishes
        days += 1
        if (days < daysToRun && !stopped) {
          setDay(days)
          loadFish()
        }
      }, 500)
    }

    loadFish()
  }

  const clearFish = () => {
    setStopped(true)
    setShowFish(false)
    setFishList([])
  }

  // get the input into a usable array
  React.useEffect(() => {
   setPuzzleInput(input1.split(',').map(v => parseInt(v.trim())))
  }, [])

  // first challenge, after 80 days, how many fishies
  React.useEffect(() => {
    if (puzzleInput.length > 0) {
      const daysToRun = 80
      let fishies = [...puzzleInput]
      for (let i = 0; i < daysToRun; i++) {
        const newFishes = []
        fishies.forEach(fish => {
          let newAge = fish - 1
          if (newAge === -1) {
            newFishes.push(6) // reset this fish
            newFishes.push(8) // spawn a new fish
          } else {
            newFishes.push(newAge) // aging fish, push it in
          }
        })
        fishies = newFishes
      }
      setFirst(fishies.length)
    }
  }, [puzzleInput])

  // second challenge, after 256 days, how many fishies
  // first challenge approach was tooooooo slow
  React.useEffect(() => {
    if (first && puzzleInput.length > 0) {
      const daysToRun = 256
      const fishCounts = Array(9).fill(0)
      puzzleInput.forEach(fish => {
        fishCounts[fish] += 1 // make an array of counts per age
      })

      // instead of brute force, just keep track of the counts of each age
      for (let day = 0; day < daysToRun; day++) {
        const fishAt0 = fishCounts[0]
        for (let age = 0; age < 8; age++) {
          fishCounts[age] = fishCounts[age + 1]
        }
        fishCounts[8] = fishAt0
        fishCounts[6] += fishAt0
      }
      setSecond(fishCounts.reduce((a,b) => a+b, 0))
    }
  }, [first, puzzleInput])

  return (
    <div className="day">
      <h2>Day 6 - Lanternfish</h2>
      <h2>Answer #1</h2>
      {first}
      <button className="smaller" onClick={play}>Play</button>
      {showFish && <div>
        {fishList.filter((f, i) => i < 10000).map((fish, index) => {
          const randx = Math.random() * window.innerWidth
          const randy = Math.random() * window.innerHeight
          return <div className="fish" style={{ top: `${randy}px`, left: `${randx}px` }} key={`${fish}-${index}`}/>
        })}
        <div className="fish-counter">Day {day}<br /> {fishList.length} fishies<br /><a href="#stop" onClick={() => setStopped(true)}>stop</a> - <a href="#clear" onClick={clearFish}>clear</a></div>
      </div>}
      <h2>Answer #2</h2>
      {second}
      <h3>Input: {puzzleInput.length} numbers</h3>
      <div dangerouslySetInnerHTML={{ __html: puzzleInput.join('<br/>') }} className="puzzle-input"></div>
    </div>
  );
}

export default Day6