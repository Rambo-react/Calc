
import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';


const App = () => {

  const [result, setResult] = useState("0");
  const [firstVal, setFirstVal] = useState("");
  const [secondVal, setSecondVal] = useState(null);
  const [history, setHistory] = useState([]);
  const [lastButtonOperator, setLastButtonOperator] = useState(false);

  const handleClick = (e) => {

    if (lastButtonOperator) {
      setResult(e.target.innerHTML)
      // setResult("0");
    } else
      if (result === "0") {
        setResult(e.target.innerHTML)
      } else {
        setResult(result.concat(e.target.innerHTML));
      }

    setLastButtonOperator(false);
  }

  const clear = () => {
    setResult("0");
  }

  const backspace = () => {
    if (result.length === 1) {
      setResult("0");
    } else {
      setResult(result.slice(0, -1)); // result.slice(0, result.length -1)
    }
  }

  const calculate = () => {
    setResult(eval(result).toString());
  }

  const operatorClick = (e) => {
    debugger
    if (!lastButtonOperator) {
      debugger
      let calcResult;
      let oper = firstVal.slice(firstVal.length - 1, firstVal.length);
      let numFirstVal = Number(firstVal.slice(0, -1));
      let numSecondVal = Number(result);
      switch (oper) {
        case "+": calcResult = numFirstVal + numSecondVal; break;
        case "-": calcResult = numFirstVal - numSecondVal; break;
        case "*": calcResult = numFirstVal * numSecondVal; break;
        case "/": calcResult = numFirstVal / numSecondVal; break;
      }
      debugger
      if (oper !== "") {
        setResult(String(calcResult));
        debugger
        setFirstVal(String(calcResult).concat(e.target.innerHTML));
      } else {
        setFirstVal(result.concat(e.target.innerHTML));
      }
      
    } else {
debugger
      setFirstVal(result.concat(e.target.innerHTML));
    }

    setLastButtonOperator(true);
  }


  return (
    <div className="App">

      <div className="calculator">

        <input value={firstVal} />
        <input value={result} readOnly={true} />


        <div className="keyboard">
          <Button child={"Clear"} handleClick={clear} />
          <Button child={"C"} handleClick={backspace} />
          <Button child={"/"} handleClick={operatorClick} />
          {/* <Button child={"/"} handleClick={handleClick} /> */}
          <Button child={"7"} handleClick={handleClick} />
          <Button child={"8"} handleClick={handleClick} />
          <Button child={"9"} handleClick={handleClick} />
          <Button child={"*"} handleClick={operatorClick} />
          {/* <Button child={"*"} handleClick={handleClick} /> */}
          <Button child={"4"} handleClick={handleClick} />
          <Button child={"5"} handleClick={handleClick} />
          <Button child={"6"} handleClick={handleClick} />
          <Button child={"-"} handleClick={operatorClick} />
          {/* <Button child={"-"} handleClick={handleClick} /> */}
          <Button child={"1"} handleClick={handleClick} />
          <Button child={"2"} handleClick={handleClick} />
          <Button child={"3"} handleClick={handleClick} />
          <Button child={"+"} handleClick={operatorClick} />
          {/* <Button child={"+"} handleClick={handleClick} /> */}
          <Button child={"0"} handleClick={handleClick} />
          <Button child={"."} handleClick={handleClick} />
          <Button child={"="} handleClick={calculate} />

          {/* <button onClick={clear} className="buttonNum" id="clear">Clear</button>
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
          <button onClick={calculate} className="buttonNum" id="equal">=</button> */}
        </div>


      </div>
      {/* <div className="historyBlock">
        <div>History</div>
        <div className="history">

          <div className="historyElement">2 +2 = 4</div>
        </div>

      </div> */}

    </div>
  )

}






export default App;
