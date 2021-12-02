import React from 'react';
import Day1 from './01-sonar-sweep/day1';

import './App.css';

function App() {
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [selectedDayComponent, setSelectedDayComponent] = React.useState(null);

  React.useEffect(() => {
    switch (selectedDay) {
      case 'day1':
        setSelectedDayComponent(<Day1 />)
        break;
      default:
        setSelectedDayComponent(null);
    }
  }, [selectedDay])

  return <div className="App">
    <header className="App-header">
      <h2>Advent of Code 2021</h2>
      <div><a href="https://twitter.com/davidlozzi" target="_blank" rel="noreferrer">by david lozzi</a> <a href="https://github.com/DavidLozzi/AdventOfCode21">go to code repo</a></div>
    </header>
    <div className="container">
      {selectedDay && <button onClick={() => setSelectedDay('') } className="back-button">Back</button>}
    {selectedDayComponent}
    {!selectedDay && <div className="buttons-wrapper">
        <button onClick={() => setSelectedDay('day1')}>Day 1 - Sonar Sweep</button>
        <button onClick={() => setSelectedDay('day2')}>Day 2 - Sonar Sweep</button>
      </div>}
    </div>
 </div>
}

export default App;
