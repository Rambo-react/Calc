
import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';


const App = () => {

  const [result, setResult] = useState("0");
  const [firstVal, setFirstVal] = useState("");
  const [secondVal, setSecondVal] = useState(null);
  const [history, setHistory] = useState([]);
  const [lastButtonOperator, setLastButtonOperator] = useState(false);
  const [lastButtonDot, setLastButtonDot] = useState(false);
  const [lastButtonEqual, setLastButtonEqual] = useState(false);


//цифры
  const handleClick = (e) => {

    if (lastButtonOperator) {
      setResult(e.target.innerHTML)
      
    } else
      if (result === "0") {
        setResult(e.target.innerHTML)
      } else {
        setResult(result.concat(e.target.innerHTML));
      }

    setLastButtonOperator(false);
  }

  //очистить
  const clear = () => {
    setResult("0");
  }

  //удалить последний символ
  const backspace = () => {
    if (result.length === 1) {
      setResult("0");
    } else {
      setResult(result.slice(0, -1)); // result.slice(0, result.length -1)
    }
  }

  //равно
  const calculate = (e) => {

    //если ничего нету
    if (firstVal === "") {
      setFirstVal(result.concat(e.target.innerHTML));
    } else 
    if (!lastButtonEqual) {
      let calcResult;
      let numFirstVal = Number(firstVal.slice(0, -1));
      let oper = firstVal.slice(firstVal.length - 1, firstVal.length);
      let SecondVal = result.includes(".", result.length - 1) ? result.slice(0, -1) : result;
      let numSecondVal = Number(SecondVal);
      switch (oper) {
        case "+": calcResult = numFirstVal + numSecondVal; break;
        case "-": calcResult = numFirstVal - numSecondVal; break;
        case "*": calcResult = numFirstVal * numSecondVal; break;
        case "/": calcResult = numFirstVal / numSecondVal; break;
      }

      setFirstVal(firstVal + SecondVal + e.target.innerHTML);
      setResult(String(calcResult));
      setLastButtonEqual(true);
    } else {

    }
    // if (firstVal.includes("=", result.length - 1)) {

    }

    // setResult(eval(result).toString());

  

  //операторы
  const operatorClick = (e) => {
    debugger
    if (!lastButtonOperator) {
      debugger
      let calcResult;
      let oper = firstVal.slice(firstVal.length - 1, firstVal.length);
      let numFirstVal = Number(firstVal.slice(0, -1));

      // let numSecondVal = Number(result);
      //если последняий символ разделитель дробной части, то просто откидываем его
      let SecondVal = result.includes(".", result.length - 1) ? result.slice(0, -1) : result;
      let numSecondVal = Number(SecondVal);
      switch (oper) {
        case "+": calcResult = numFirstVal + numSecondVal; break;
        case "-": calcResult = numFirstVal - numSecondVal; break;
        case "*": calcResult = numFirstVal * numSecondVal; break;
        case "/": calcResult = numFirstVal / numSecondVal; break;
      }
      
      if (oper !== "") {
        debugger
        setResult(String(calcResult));
        
        setFirstVal(String(calcResult).concat(e.target.innerHTML));
      } else {
        debugger
        setFirstVal(SecondVal.concat(e.target.innerHTML));
      }

    } else {
      debugger
      setFirstVal(result.concat(e.target.innerHTML));
    }

    setLastButtonOperator(true);
  }

  //разделитель целой и дробной части
  const dotButtonHandler = (e) => {
    if (lastButtonOperator) {
      setResult("0.");
    } else
      if (!result.includes(".")) {
        setResult(result.concat(e.target.innerHTML));
      }
    setLastButtonOperator(false);
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
          <Button child={"7"} handleClick={handleClick} />
          <Button child={"8"} handleClick={handleClick} />
          <Button child={"9"} handleClick={handleClick} />
          <Button child={"*"} handleClick={operatorClick} />
          <Button child={"4"} handleClick={handleClick} />
          <Button child={"5"} handleClick={handleClick} />
          <Button child={"6"} handleClick={handleClick} />
          <Button child={"-"} handleClick={operatorClick} />
          <Button child={"1"} handleClick={handleClick} />
          <Button child={"2"} handleClick={handleClick} />
          <Button child={"3"} handleClick={handleClick} />
          <Button child={"+"} handleClick={operatorClick} />
          <Button child={"0"} handleClick={handleClick} />
          <Button child={"."} handleClick={dotButtonHandler} />
          <Button child={"="} handleClick={calculate} />
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
