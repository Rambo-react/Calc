
import React, { useState } from 'react';
import './App.css';
// import DivideButton from './components/DivideButton';
// import MinusButton from './components/MinusButton';
// import MultiplyButton from './components/MultiplyButton';
// import NumberButton from './components/NumberButton';
// import PlusButton from './components/PlusButton';

const App = () => {

  const [result, setResult] = useState("");

  const handleClick = (e) => {
    //условия
    setResult( result.concat( e.target.innerHTML));

  }

  const clear = () => {
    setResult("");
  }

  const backspace = () => {
    setResult(result.slice(0, -1)); // result.slice(0, result.length -1)
  }

  const calculate = () => {
    setResult(eval(result).toString());
  }



  return (
    <div className="App">

      <div className="calculator">

        
          <input value={result} />
        

        <div className="keyboard">
          <button onClick={clear} className="buttonNum" id="clear">Clear</button>
          <button onClick={backspace} className="buttonNum" id="backspace">C</button>
          <button onClick={handleClick} className="buttonNum">/</button>
          <button onClick={handleClick} className="buttonNum">7</button>
          <button onClick={handleClick} className="buttonNum">8</button>
          <button onClick={handleClick} className="buttonNum">9</button>
          <button onClick={handleClick} className="buttonNum">X</button>
          <button onClick={handleClick} className="buttonNum">4</button>
          <button onClick={handleClick} className="buttonNum">5</button>
          <button onClick={handleClick} className="buttonNum">6</button>
          <button onClick={handleClick} className="buttonNum">-</button>
          <button onClick={handleClick} className="buttonNum">1</button>
          <button onClick={handleClick} className="buttonNum">2</button>
          <button onClick={handleClick} className="buttonNum">3</button>
          <button onClick={handleClick} className="buttonNum">+</button>
          <button onClick={handleClick} className="buttonNum">0</button>
          <button onClick={handleClick} className="buttonNum">.</button>
          <button onClick={calculate} className="buttonNum" id="equal">=</button>
        </div>


      </div>
      <div className="historyBlock">
      <div>History</div>
      <div className="history">

       <div className="historyElement">2 +2 = 4</div> 
      </div>
        
      </div>

    </div>
  )

}






export default App;
