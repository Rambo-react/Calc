
import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';


const App = () => {

  const [result, setResult] = useState("0");
  const [firstVal, setFirstVal] = useState("");
  // const [secondVal, setSecondVal] = useState(null);
  // const [history, setHistory] = useState([]);
  const [lastButtonOperator, setLastButtonOperator] = useState(false);
  // const [lastButtonDot, setLastButtonDot] = useState(false);
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
    debugger
    //если ничего нету
    if (firstVal === "") {
      debugger
      setFirstVal(result.concat(e.target.innerHTML));

    } else if (!lastButtonEqual) {
      debugger
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
      debugger
      setFirstVal(firstVal + SecondVal + e.target.innerHTML);
      setResult(String(calcResult));

    } else {
      //ищем оператор 
      let arrOperators = ["+", "-", "*", "/"];
      let oper = "";
      for (let index = 0; index < arrOperators.length; index++) {
        //ищем со второго номера элемента, т.к может быть отрицательное число
        if (firstVal.includes(arrOperators[index], 1)) { oper = arrOperators[index]; break; }
      }
      //если никакой оператор не найден, то
      if (oper === "") {
        //добавляем в историю , другие действия не требуются
      } else {
        let calcResult;
        //ищем со второго номера элемента, т.к может быть отрицательное число
        let FirstVal = firstVal.slice(firstVal.indexOf(oper, 1) + 1, -1);
        let numFirstVal = Number(FirstVal);
        let SecondVal = result;
        let numSecondVal = Number(SecondVal);

        switch (oper) {
          case "+": calcResult = numSecondVal + numFirstVal; break;
          case "-": calcResult = numSecondVal - numFirstVal; break;
          case "*": calcResult = numSecondVal * numFirstVal; break;
          case "/": calcResult = numSecondVal / numFirstVal; break;
        }
        debugger
        setFirstVal(`${SecondVal}${oper}${FirstVal}=`);
        setResult(String(calcResult));

      }

    }
    setLastButtonEqual(true);
    setLastButtonOperator(false);


  }






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
        case "=": calcResult = numSecondVal; break;
      }

      if ((oper !== "") && (oper!=="=")) {
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
    if (lastButtonOperator || lastButtonEqual) {
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
