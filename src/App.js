
import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import HistoryElement from './components/HistoryElement';


const App = () => {


  const [result, setResult] = useState("0");
  const [firstVal, setFirstVal] = useState("");
  const [historyArray, setHistory] = useState([]);
  const [lastButtonOperator, setLastButtonOperator] = useState(false);
  const [lastButtonEqual, setLastButtonEqual] = useState(false);

  const calcValues = (oper, numFirstVal, numSecondVal) => {
    let calcResult;
    switch (oper) {
      case "+": calcResult = numFirstVal + numSecondVal; break;
      case "-": calcResult = numFirstVal - numSecondVal; break;
      case "*": calcResult = numFirstVal * numSecondVal; break;
      case "/": calcResult = numFirstVal / numSecondVal; break;
      case "=": calcResult = numSecondVal; break;
    }
    return calcResult;
  }

  //события нажатия на клавиатуре(дублирование нажатие мышкой)
  useEffect(() => {
    let fn = (e) => {
      let arrKeys = ["Backspace", "=", "+", "-", "/", "*", "."];
      switch (e.key) {
        case (Boolean(e.key.match(/[0-9]/)) && e.key): document.getElementById(e.key).click(); break;
        case arrKeys.some(x => x === e.key) ? e.key : false: document.getElementById(e.key).click(); break;
        case "Enter": document.getElementById("=").click(); break;
        case "Delete": document.getElementById("C").click(); break;
        default: break;
      }
    }

    document.addEventListener('keydown', fn)

    return () => document.removeEventListener('keydown', fn)
  }, [])

  //цифры
  const handleClickNum = (e) => {

    if (lastButtonOperator || lastButtonEqual) {
      setResult(e)
      setLastButtonOperator(false);
      setLastButtonEqual(false);
    }
    else {

      if (result === "0") {
        setResult(e);
        setLastButtonOperator(false);
        setLastButtonEqual(false);
      } else if (result.length < 18) {
        setResult(result.concat(e));
        setLastButtonOperator(false);
        setLastButtonEqual(false);
      }
    }

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
      setResult((result) => { return result.slice(0, -1) }); // result.slice(0, result.length -1)
    }
  }

  //равно
  const calculate = (e) => {

    //если ничего нету
    if (firstVal === "") {

      let FirstVal = result.concat(e.target.innerHTML);
      let SecondVal = result;
      setFirstVal(FirstVal);
      setHistory([...historyArray, [FirstVal, SecondVal]]);

    } else if (!lastButtonEqual && !firstVal.includes("=")) {
      //если строка не содержит "=" и последняя кнопка не равна "="
      let calcResult;
      let FirstVal = firstVal.slice(0, -1);
      let numFirstVal = Number(FirstVal);
      let oper = firstVal.slice(firstVal.length - 1, firstVal.length);
      let SecondVal = result.includes(".", result.length - 1) ? result.slice(0, -1) : result;
      let numSecondVal = Number(SecondVal);

      calcResult = calcValues(oper, numFirstVal, numSecondVal);

      if (calcResult !== undefined) {
        calcResult = Number(calcResult.toFixed(16));
      }

      setResult(String(calcResult));
      setFirstVal(firstVal + SecondVal + e.target.innerHTML);
      setHistory([...historyArray, [firstVal + SecondVal + e.target.innerHTML, String(calcResult)]]);
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
        setHistory([...historyArray, [FirstVal, SecondVal]]);
      } else {
        let calcResult;
        //ищем со второго номера элемента, т.к может быть отрицательное число
        let FirstVal = firstVal.slice(firstVal.indexOf(oper, 1) + 1, -1);
        let numFirstVal = Number(FirstVal);
        let SecondVal = result;
        let numSecondVal = Number(SecondVal);
        calcResult = calcValues(oper, numFirstVal, numSecondVal);

        if (calcResult !== undefined) {
          calcResult = Number(calcResult.toFixed(16));
        }

        setResult(String(calcResult));
        setFirstVal(`${SecondVal}${oper}${FirstVal}=`);
        setHistory([...historyArray, [`${SecondVal}${oper}${FirstVal}=`, String(calcResult)]]);

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
      calcResult = calcValues(oper, numFirstVal, numSecondVal);

      //фиксим 0,1 и 0,2
      if (calcResult !== undefined) {
        calcResult = Number(calcResult.toFixed(16));
      }


      if ((oper !== "") && (oper !== "=")) {
        FirstVal = `${FirstVal}${oper}${SecondVal}=`;

        SecondVal = String(calcResult);
        setResult(String(calcResult));
        setFirstVal(String(calcResult).concat(e.target.innerHTML));
        setHistory([...historyArray, [FirstVal, SecondVal]]);
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


  let historyElements = historyArray.map((el, index) => {
    return <HistoryElement key={index} historyElement={el} historyHandle={historyHandle} />
  });

  return (
    <div className="App">
      <div className="calculator">
        <div className="calcBlock">
          <input className="firstVal" value={firstVal} readOnly={true} />
          <input className="result" value={result} readOnly={true} type="text" onKeyDown={handleClickNum} />
        </div>
        <div className="keyboard">
          <Button child={"C"} handleClick={clearAll} />
          <Button child={"CE"} handleClick={clear} />
          <Button child={"Backspace"} handleClick={backspace} />
          <Button child={"/"} handleClick={operatorClick} />
          <Button child={"7"} handleClick={handleClickNum} />
          <Button child={"8"} handleClick={handleClickNum} />
          <Button child={"9"} handleClick={handleClickNum} />
          <Button child={"*"} handleClick={operatorClick} />
          <Button child={"4"} handleClick={handleClickNum} />
          <Button child={"5"} handleClick={handleClickNum} />
          <Button child={"6"} handleClick={handleClickNum} />
          <Button child={"-"} handleClick={operatorClick} />
          <Button child={"1"} handleClick={handleClickNum} />
          <Button child={"2"} handleClick={handleClickNum} />
          <Button child={"3"} handleClick={handleClickNum} />
          <Button child={"+"} handleClick={operatorClick} />
          <Button child={"+/-"} handleClick={plusMinus} />
          <Button child={"0"} handleClick={handleClickNum} />
          <Button child={"."} handleClick={dotButtonHandler} />
          <Button child={"="} handleClick={calculate} />
        </div>
      </div>
      <div className="historyBlock">
        <div><p className="titleHistory">History</p></div>
        <div className="history">
          {historyElements}
        </div>
        {historyArray.length === 0 || <button className="clearHistory" title="Clear all history" onClick={() => { setHistory([]) }}></button>}

      </div>

    </div>
  )

}


export default App;
