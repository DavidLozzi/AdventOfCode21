import React from 'react'
import input1 from './input1'

const Day8 = () => {
  const [puzzleInput, setPuzzleInput] = React.useState([]);
  const [first, setFirst] = React.useState()
  const [second, setSecond] = React.useState()

  // get the input into a usable array
  React.useEffect(() => {
    setPuzzleInput(input1.split('\n').map(v => {
      const [signal, output] = v.trim().split('|')
      return {signal, output}
    }))
  }, [])

  // first challenge, how many times do 1, 4, 7, and 8 appear
  React.useEffect(() => {
    if (puzzleInput) {
      console.log(puzzleInput)
      const totalCounts = puzzleInput.reduce((a, b) => {
        const matchCnt = b.output.match(/\b[a-z]{2}\b|\b[a-z]{3,4}\b|\b[a-z]{7}\b/gi)?.length || 0
        return a + matchCnt
      }, 0)
      setFirst(totalCounts)
    }
  }, [puzzleInput])

  // second challenge, decipher the codes
  /*
      0:      1:      2:      3:      4:
     aaaa    ....    aaaa    aaaa    ....
    b    c  .    c  .    c  .    c  b    c
    b    c  .    c  .    c  .    c  b    c
     ....    ....    dddd    dddd    dddd
    e    f  .    f  e    .  .    f  .    f
    e    f  .    f  e    .  .    f  .    f
     gggg    ....    gggg    gggg    ....

      5:      6:      7:      8:      9:
     aaaa    aaaa    aaaa    aaaa    aaaa
    b    .  b    .  .    c  b    c  b    c
    b    .  b    .  .    c  b    c  b    c
     dddd    dddd    ....    dddd    dddd
    .    f  e    f  .    f  e    f  .    f
    .    f  e    f  .    f  e    f  .    f
     gggg    gggg    ....    gggg    gggg
  */
  React.useEffect(() => {
    if (first && puzzleInput) {
      console.warn('second puzzle')
      puzzleInput.forEach(p => {
        const numberMap = { // positions referring to above map
          a: '',
          b: '',
          c: '',
          d: '',
          e: '',
          f: '',
          g: ''
        }
        const signals = p.signal.split(' ').map(s => s.trim())
        const one = signals.find(s => s.length === 2)
        if (one) {
          const [first, second] = one.split('')
          numberMap.c = first
          numberMap.f = second
        }
        const seven = signals.find(s => s.length === 3)
        if (seven) {
          const [first, second, third] = seven.split('')
          if (first !== numberMap.c && first !== numberMap.f) {
            numberMap.a = first
          } else if (second !== numberMap.c && second !== numberMap.f) {
            numberMap.a = second
          } else {
            numberMap.a = third
          }
        }
        const four = signals.find(s => s.length === 4)
        if (four) {
          const [first, second, third, fourth] = four.split('')
          const savePosition = []
          if (!Object.values(numberMap).some(v => v === first)) {
            savePosition.push(first)
          }
          if (!Object.values(numberMap).some(v => v === second)) {
            savePosition.push(second)
          }
          if (!Object.values(numberMap).some(v => v === third)) {
            savePosition.push(third)
          }
          if (!Object.values(numberMap).some(v => v === fourth)) {
            savePosition.push(fourth)
          }
          numberMap.b = savePosition[0]
          numberMap.d = savePosition[1]
        }
        const eight = signals.find(s => s.length === 7)
        if (eight) {
          const [first, second, third, fourth, fifth, sixth, seventh] = eight.split('')
          const savePosition = []
          if (!Object.values(numberMap).some(v => v === first)) {
            savePosition.push(first)
          }
          if (!Object.values(numberMap).some(v => v === second)) {
            savePosition.push(second)
          }
          if (!Object.values(numberMap).some(v => v === third)) {
            savePosition.push(third)
          }
          if (!Object.values(numberMap).some(v => v === fourth)) {
            savePosition.push(fourth)
          }
          if (!Object.values(numberMap).some(v => v === fifth)) {
            savePosition.push(fifth)
          }
          if (!Object.values(numberMap).some(v => v === sixth)) {
            savePosition.push(sixth)
          }
          if (!Object.values(numberMap).some(v => v === seventh)) {
            savePosition.push(seventh)
          }
          // now have to align them properly
          const { a, b, d, f } = numberMap;
          const fiveRegex = new RegExp(`[${a}${b}${d}${f}]`, 'ig') // ignoring G for now
          const five = signals.find(s => s.length === 5 && s.match(fiveRegex))
          if (five.indexOf(savePosition[0]) > -1) { // this is the bottom line g
            console.log('first', five)
            numberMap.g = savePosition[0]
            numberMap.e = savePosition[1]
          } else { // its bottom line is the other
            console.log('second', five)
            numberMap.g = savePosition[1]
            numberMap.e = savePosition[0]

          }
        }
        console.log(numberMap)
        const { a, b, c, d, e, f, g } = numberMap;
        console.log(`
 ${a.padEnd(4, a)}
${b}    ${c}
${b}    ${c}
 ${d.padEnd(4, d)}
${e}    ${f}
${e}    ${f}
 ${g.padEnd(4,g)}
        `)

        const numberDef = {
          0: `${a}${b}${c}${e}${f}${g}`,
          1: `${c}${f}`,
          2: `${a}${c}${d}${e}${g}`,
          3: `${a}${c}${d}${f}${g}`,
          4: `${b}${c}${d}${f}`,
          5: `${a}${b}${d}${f}${g}`,
          6:  `${a}${b}${d}${e}${f}${g}`,
          7:  `${a}${c}${f}`,
          8: `${a}${b}${c}${d}${e}${f}${g}`,
          9:  `${a}${b}${c}${d}${f}${g}`,
        }
        console.log(numberDef)
        //get output value

        const outputs = p.output.trim().split(' ').map(o => o.trim())
        console.log(outputs)
        const outputVal = outputs.reduce((total, output) => {
          const theNumber = Object.keys(numberDef).find(key => {
            const numValue = numberDef[key]
            const outputRegex = new RegExp(`\\b[${output}]{${output.length}}\\b`, 'ig')
            // console.log('matching', numValue, 'to', output, outputRegex, numValue.match(outputRegex))
            return numValue.match(outputRegex)
          })
          return total + theNumber
        }, '')
        console.log('output value', outputVal)
      })


      setSecond()
    }
  }, [first, puzzleInput])

  return (
    <div className="day">
      <h2>Day 8 - Seven Segment Search</h2>
      <h2>Answer #1</h2>
      {first}
      <h2>Answer #2</h2>
      {second}
      <h3>Input: {puzzleInput.length} numbers</h3>
      <div dangerouslySetInnerHTML={{ __html: input1.split('\n').join('<br/>') }} className="puzzle-input"></div>
    </div>
  );
}

export default Day8