
import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import HistoryElement from './components/HistoryElement';


const App = () => {

  const [result, setResult] = useState("0");
  const [firstVal, setFirstVal] = useState("");
  const [history, setHistory] = useState([]);
  const [lastButtonOperator, setLastButtonOperator] = useState(false);
  const [lastButtonEqual, setLastButtonEqual] = useState(false);
  

  //цифры
  const handleClick = (e) => {

    if (lastButtonOperator || lastButtonEqual) {
      setResult(e.target.innerHTML)

    } else
      if (result === "0") {
        setResult(e.target.innerHTML)
      } else {
        setResult(result.concat(e.target.innerHTML));
      }

    setLastButtonOperator(false);
    setLastButtonEqual(false);
  }

  //очистить
  const clear = () => {
    setResult("0");
  }

  //очистить всё
  const clearAll = () => {
    setResult("0");
    setFirstVal("");
    setLastButtonOperator(false);
    setLastButtonEqual(false);
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

      let FirstVal = result.concat(e.target.innerHTML);
      let SecondVal = result;
      setFirstVal(FirstVal);
      setHistory([...history, [FirstVal, SecondVal]]);

    } else if (!lastButtonEqual && !firstVal.includes("=")) {
      //если строка не содержит "=" и последняя кнопка не равна "="
      let calcResult;
      let FirstVal = firstVal.slice(0, -1);
      let numFirstVal = Number(FirstVal);
      let oper = firstVal.slice(firstVal.length - 1, firstVal.length);
      let SecondVal = result.includes(".", result.length - 1) ? result.slice(0, -1) : result;
      let numSecondVal = Number(SecondVal);
      switch (oper) {
        case "+": calcResult = numFirstVal + numSecondVal; break;
        case "-": calcResult = numFirstVal - numSecondVal; break;
        case "*": calcResult = numFirstVal * numSecondVal; break;
        case "/": calcResult = numFirstVal / numSecondVal; break;
      }
      if (calcResult !== undefined) { calcResult = Number(calcResult.toFixed(16)) }
      setResult(String(calcResult));
      setFirstVal(firstVal + SecondVal + e.target.innerHTML);
      setHistory([...history, [firstVal + SecondVal + e.target.innerHTML, String(calcResult)]]);
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
        let SecondVal = result;
        let FirstVal = `${result}=`;
        setFirstVal(FirstVal);
        setHistory([...history, [FirstVal, SecondVal]]);
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
        if (calcResult !== undefined) { calcResult = Number(calcResult.toFixed(16)) }
        setResult(String(calcResult));
        setFirstVal(`${SecondVal}${oper}${FirstVal}=`);
        setHistory([...history, [`${SecondVal}${oper}${FirstVal}=`, String(calcResult)]]);

      }
    }
    setLastButtonOperator(false);
    setLastButtonEqual(true);
  }

  //операторы
  const operatorClick = (e) => {

    if (!lastButtonOperator) {

      let calcResult;
      let oper = firstVal.slice(firstVal.length - 1, firstVal.length);
      let FirstVal = firstVal.slice(0, -1);
      let numFirstVal = Number(FirstVal);

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
      //фиксим 0,1 и 0,2
      if (calcResult !== undefined) { calcResult = Number(calcResult.toFixed(16)) }

      if ((oper !== "") && (oper !== "=")) {
        FirstVal = `${FirstVal}${oper}${SecondVal}=`;
        SecondVal = String(calcResult);
        setResult(String(calcResult));
        setFirstVal(String(calcResult).concat(e.target.innerHTML));
        setHistory([...history, [FirstVal, SecondVal]]);
      } else {
        setFirstVal(SecondVal.concat(e.target.innerHTML));
      }
    } else {
      setFirstVal(result.concat(e.target.innerHTML));
    }
    setLastButtonOperator(true);
    setLastButtonEqual(false);
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
  //плюс минус
  const plusMinus = () => {
    if (result !== "0") {
      result.includes("-") ? setResult(result.replace("-", "")) : setResult("-".concat(result));
    }
  }
  //история
  const historyHandle = (el) => {
    //после нажатия на дивку , значения переносятся в калькулятор
    setResult(el[1]);
    setFirstVal(el[0]);
    setLastButtonOperator(false);
    setLastButtonEqual(true);
  }

  let historyElements = history.map((el, index) => {
    return <HistoryElement key={index} historyElement={el} historyHandle={historyHandle} />
  });

  return (
    <div className="App">

      <div className="calculator">
        <input value={firstVal} readOnly={true} />
        <input value={result} readOnly={true} />
        <div className="keyboard">
          <Button styles={["button"]} child={"C"} handleClick={clearAll} />
          <Button styles={["button"]} child={"CE"} handleClick={clear} />
          <Button styles={["button"]} child={"<="} handleClick={backspace} />
          <Button styles={["button"]} child={"/"} handleClick={operatorClick} />
          <Button styles={["button", "numButton"]} child={"7"} handleClick={handleClick} />
          <Button styles={["button", "numButton"]} child={"8"} handleClick={handleClick} />
          <Button styles={["button", "numButton"]} child={"9"} handleClick={handleClick} />
          <Button styles={["button"]} child={"*"} handleClick={operatorClick} />
          <Button styles={["button", "numButton"]} child={"4"} handleClick={handleClick} />
          <Button styles={["button", "numButton"]} child={"5"} handleClick={handleClick} />
          <Button styles={["button", "numButton"]} child={"6"} handleClick={handleClick} />
          <Button styles={["button"]} child={"-"} handleClick={operatorClick} />
          <Button styles={["button", "numButton"]} child={"1"} handleClick={handleClick} />
          <Button styles={["button", "numButton"]} child={"2"} handleClick={handleClick} />
          <Button styles={["button", "numButton"]} child={"3"} handleClick={handleClick} />
          <Button styles={["button"]} child={"+"} handleClick={operatorClick} />
          <Button styles={["button", "numButton"]} child={"+/-"} handleClick={plusMinus} />
          <Button styles={["button", "numButton"]} child={"0"} handleClick={handleClick} />
          <Button styles={["button", "numButton"]} child={"."} handleClick={dotButtonHandler} />
          <Button styles={["button"]} child={"="} handleClick={calculate} />
        </div>

      </div>
      <div className="historyBlock">
        <div>History</div>
        <div className="history">
          {historyElements}
        </div>
        <button className="clearHistory" onClick={() => { setHistory([]) }}></button>

      </div>

    </div>
  )

}


export default App;
