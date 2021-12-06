import React from 'react'
import Day1 from './01-sonar-sweep/day1'
import Day2 from './02-dive/day2'
import Day3 from './03-binary-diagnostic/day3'
import Day4 from './04-giant-squid/day4'
import Day5 from './05-hydrothermal-venture/day5'
import Day6 from './06-lanternfish/day6'

import './App.css';

function App() {
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [selectedDayComponent, setSelectedDayComponent] = React.useState(null);

  React.useEffect(() => {
    switch (selectedDay) {
      case 'day1':
        setSelectedDayComponent(<Day1 />)
        break;
      case 'day2':
        setSelectedDayComponent(<Day2 />)
        break;
      case 'day3':
        setSelectedDayComponent(<Day3 />)
        break;
      case 'day4':
        setSelectedDayComponent(<Day4 />)
        break;
      case 'day5':
        setSelectedDayComponent(<Day5 />)
        break;
      case 'day6':
        setSelectedDayComponent(<Day6 />)
        break;
      default:
        setSelectedDayComponent(null);
    }
  }, [selectedDay])

  React.useEffect(() => {
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search)
      if (params.get('day')) {
        setSelectedDay(`day${params.get('day')}`)
      }
    }
  }, [])

  return <div className="App">
    <div className="snowflakes" aria-hidden="true">
      <div className="snowflake">
      ❅
      </div>
      <div className="snowflake">
      ❆
      </div>
      <div className="snowflake">
      ❅
      </div>
      <div className="snowflake">
      ❆
      </div>
      <div className="snowflake">
      ❅
      </div>
      <div className="snowflake">
      ❆
      </div>
      <div className="snowflake">
        ❅
      </div>
      <div className="snowflake">
        ❆
      </div>
      <div className="snowflake">
        ❅
      </div>
      <div className="snowflake">
        ❆
      </div>
      <div className="snowflake">
        ❅
      </div>
      <div className="snowflake">
        ❆
      </div>
    </div>
    <header className="App-header">
      <h2>Advent of Code 2021</h2>
      <div><a href="https://twitter.com/davidlozzi" target="_blank" rel="noreferrer">by david lozzi</a> <a href="https://github.com/DavidLozzi/AdventOfCode21">go to code repo</a></div>
    </header>
    <div className="container">
      {selectedDay && <button onClick={() => setSelectedDay('') } className="smaller">Back</button>}
    {selectedDayComponent}
    {!selectedDay && <div className="buttons-wrapper">
        <button onClick={() => setSelectedDay('day1')}>Day 1 - Sonar Sweep</button>
        <button onClick={() => setSelectedDay('day2')}>Day 2 - Dive</button>
        <button onClick={() => setSelectedDay('day3')}>Day 3 - Binary Diagnostic</button>
        <button onClick={() => setSelectedDay('day4')}>Day 4 - Giant Squid</button>
        <button onClick={() => setSelectedDay('day5')}>Day 5 - Hydrothermal Venture</button>
        <button onClick={() => setSelectedDay('day6')}>Day 6 - Lanternfish</button>
      </div>}
    </div>
 </div>
}

export default App;
