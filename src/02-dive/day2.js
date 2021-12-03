import React from 'react'
import input1 from './input1';
import './submarine.css'

const Day2 = () => {
  const [puzzleInput, setPuzzleInput] = React.useState([])
  const [prepData, setPrepData] = React.useState([])
  const [first, setFirst] = React.useState()
  const [second, setSecond] = React.useState()
  const [showAnimate, setShowAnimate] = React.useState(false)

  const subRef = React.useRef()
  const [subX, setSubX] = React.useState(0)
  const [subY, setSubY] = React.useState(0)

  const animate = () => {
    setShowAnimate(true)
    let top = 170
    let left = 0
    const xRatio = (window.innerWidth - subRef.current.offsetWidth - left) / totalX;
    const yRatio = (window.innerHeight - subRef.current.offsetHeight - top) / (totalY * -1);
    subRef.current.style.top = `${top}px`
    subRef.current.style.left = `${left}px`
    let counter = 0
    const moveSubmarine = () => {
      if (counter < prepData.length) {
        setTimeout(() => {
          const p = prepData[counter]
          setSubX(x => x + p.x)
          setSubY(y => y + p.y)
          top += p.y * -1 * yRatio
          left += p.x * xRatio
          subRef.current.style.top = `${top}px`
          subRef.current.style.left = `${left}px`
          counter += 1
          moveSubmarine()
        }, 30)
      }
    }
    moveSubmarine()
  }
  // prep the data so we can use it
  React.useEffect(() => {
    const _input = input1.split('\n').map(v => v.trim())
    setPuzzleInput(_input)
    const _prepData = _input.map(p => {
      // expecting a 'direction #' format
      const [ , direction, distance ] = p.match(/([a-z]*)\s([0-9]*)/) // get the direction and the distance from the value
      console.log(direction, distance)
      switch (direction) { // translate the direction to the X or Y values
        case 'forward':
          return {
            x: parseInt(distance),
            y: 0
          }
        case 'backward':
          return {
            x: parseInt(distance) * -1,
            y: 0
          }
        case 'up':
          return {
            x: 0,
            y: parseInt(distance)
          }
        case 'down':
          return {
            x: 0,
            y: parseInt(distance) * -1
          }
        default:
          return {}
      }
    })
    setPrepData(_prepData)
  }, [])

  // first challenge, where do they end up?
  const [totalX, setTotalX] = React.useState(0) // starting at 0 horizontally
  const [totalY, setTotalY] = React.useState(0) // starting at 0 depth
  React.useEffect(() => {
    if (prepData?.length > 0) {
      let x = 0
      let y = 0
      prepData.forEach(p => {
        x += p.x
        y += p.y
      })
      setTotalX(x)
      setTotalY(y)
      setFirst(x * y * -1)
    }
  }, [prepData])

  // second challenge, in addition to the location, we have to aim it as well
  const [totalX2, setTotalX2] = React.useState(0) // starting at 0 horizontally
  const [totalY2, setTotalY2] = React.useState(0) // starting at 0 depth
  const [totalAim, setTotalAim] = React.useState(0) // starting aim at 0
  React.useEffect(() => {
    if (first && prepData?.length > 0) {
      let x = 0
      let y = 0
      let aim = 0
      prepData.forEach(p => {
        x += p.x
        aim += p.y * -1 // up/down opposite of what the data has been prepped above
        if (p.x > 0) {
          y += aim * p.x
        }
      })
      setTotalAim(aim)
      setTotalX2(x)
      setTotalY2(y)
      setSecond(x * y)
    }
  }, [first, prepData])

  return (
    <div>
      <h2>Day 2 - Dive</h2>
      <h2>Answer #1</h2>
      {totalX} horizontal x {totalY} depth = {first}
      <div>
        {!showAnimate && <button onClick={animate} className="smaller">animate</button>}
        <div className="submarine" ref={subRef} style={{ visibility: showAnimate ? 'visible' : 'hidden' }}>sub {subX}x{subY}</div>
      </div>
      <h2>Answer #2</h2>
      {totalX2} horizontal x {totalY2} depth = {second} (with an aim of {totalAim})
      <h3>Input: {puzzleInput.length} coordinates</h3>
      <div dangerouslySetInnerHTML={{ __html: puzzleInput.join('<br/>') }} className="puzzle-input"></div>
    </div>
  );
}

export default Day2