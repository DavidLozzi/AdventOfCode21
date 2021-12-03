import React from 'react'
import input1 from './input1';

const Day3 = () => {
  const [puzzleInput, setPuzzleInput] = React.useState([]);
  const [gammaBinary, setGammaBinary] = React.useState('')
  const [gammaRate, setGammaRate] = React.useState(0)
  const [epsilonBinary, setEpsilonBinary] = React.useState('')
  const [epsilonRate, setEpsilonRate] = React.useState(0)
  const [first, setFirst] = React.useState()

  const [oxygenBinary, setOxygenBinary] = React.useState('')
  const [co2Binary, setCO2Binary] = React.useState('')
  const [oxygenRating, setOxygenRating] = React.useState(0)
  const [co2Rating, setCO2Rating] = React.useState(0)
  const [second, setSecond] = React.useState()

  const getBinaries = (binaryArray) => {
    const counts = new Map()
    binaryArray.forEach(p => { // loop through and add the numbers, this will give us the count of 1s in each position
      const bits = p.split("");
      bits.forEach((b, indx) => {
        const bNum = parseInt(b)
        if (counts.has(indx)) {
          counts.set(indx, counts.get(indx) + bNum)
        } else {
          counts.set(indx, bNum)
        }
      })
    })
    console.log(counts)
    const totalNums = binaryArray.length
    let _gammaRate = ''
    let _epsilonRate = ''
    // determine the common and least common bits, minus the count of ones from the length to get the count of 0s
    counts.forEach((value, key) => {
      if (totalNums - value > value) {
        _gammaRate += '0'
        _epsilonRate += '1'
      } else {
        _gammaRate += '1'
        _epsilonRate += '0'
      }
    })

    return [_gammaRate, _epsilonRate]
  }
  // get the input into a usable array
  React.useEffect(() => {
   setPuzzleInput(input1.split('\n').map(v => v.trim()))
  }, [])

  // first challenge, find the most common bits (gamma rate) and the least common bits (epsilon rate) to find the power consumption
  React.useEffect(() => {
    if (puzzleInput?.length > 0) {
      const [_gammaRate, _epsilonRate] = getBinaries(puzzleInput)

      setGammaBinary(_gammaRate) // this will be needed in the 2nd puzzle
      setEpsilonBinary(_epsilonRate)

      const _gamma = parseInt(_gammaRate, 2) // convert binary to decimal
      const _epsilon = parseInt(_epsilonRate, 2) // convert binary to decimal
      setGammaRate(_gamma)
      setEpsilonRate(_epsilon)

      setFirst(_gamma * _epsilon)
    }
  }, [puzzleInput])

  // second challenge, find the most common value (oxygen generator rating) comparing each bit and filtering out the least common bit
  // find the lease common value (CO2 scrubber rating) comparing each bit and filtering out the most common bit
  React.useEffect(() => {
    if (gammaBinary) {
      console.warn('starting second challenge')

      // find the oxygen generator rating
      let oxyResults = [...puzzleInput]
      let commonBits = gammaBinary
      let bitIndex = 0
      while (bitIndex < commonBits.length && oxyResults.length > 1) {
        const bit = commonBits.substring(bitIndex, bitIndex + 1)
        console.log(commonBits, bitIndex, bit)
        oxyResults = oxyResults.filter(r => r.substring(bitIndex, bitIndex + 1) === bit)
        console.log('found', oxyResults.length)
        commonBits = getBinaries(oxyResults)[0]
        bitIndex += 1
      }
      setOxygenBinary(oxyResults[0])
      setOxygenRating(parseInt(oxyResults[0], 2))
     
      // find the CO2 scrubber rating
      let co2Results = [...puzzleInput]
      commonBits = epsilonBinary
      bitIndex = 0
      while (bitIndex < commonBits.length && co2Results.length > 1) {
        const bit = commonBits.substring(bitIndex, bitIndex + 1)
        console.log(commonBits, bitIndex, bit)
        co2Results = co2Results.filter(r => r.substring(bitIndex, bitIndex + 1) === bit)
        console.log('found', co2Results.length)
        commonBits = getBinaries(co2Results)[1]
        bitIndex += 1
      }
      setCO2Binary(co2Results[0])
      setCO2Rating(parseInt(co2Results[0], 2))

      setSecond(parseInt(oxyResults[0], 2) * parseInt(co2Results[0], 2))
    }
  }, [gammaBinary, epsilonBinary, puzzleInput])

  return (
    <div>
      <h2>Day 3 - Binary Diagnostic</h2>
      <h2>Answer #1</h2>
      {gammaRate} ({gammaBinary}) gamma rate x {epsilonRate} ({epsilonBinary}) epsilon rate = {first}
      <h2>Answer #2</h2>
      {oxygenRating} ({oxygenBinary}) oxygen generator rating x {co2Rating} ({co2Binary}) CO2 scrubber rating = {second}
      <h3>Input: {puzzleInput.length} numbers</h3>
      <div dangerouslySetInnerHTML={{ __html: puzzleInput.join('<br/>') }} className="puzzle-input"></div>
    </div>
  );
}

export default Day3