
import React, { useState } from 'react';
import './App.css';
import Button from './components/Button';
import HistoryElement from './components/HistoryElement';


const App = () => {

  const [result, setResult] = useState("0");
  const [firstVal, setFirstVal] = useState("");
  // const [secondVal, setSecondVal] = useState(null);
  const [history, setHistory] = useState([]);
  const [lastButtonOperator, setLastButtonOperator] = useState(false);
  // const [lastButtonDot, setLastButtonDot] = useState(false);
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
    setLastButtonEqual(false);
    setLastButtonOperator(false);
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
      setHistory([...history, [FirstVal, SecondVal]]);
      setFirstVal(FirstVal);
      
      

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
      
      setHistory([...history, [firstVal + SecondVal + e.target.innerHTML, String(calcResult)]]);
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
        let SecondVal = result;
        let FirstVal = firstVal;
        
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
        
        setHistory([...history, [`${SecondVal}${oper}${FirstVal}=`, String(calcResult)]]);
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

      if ((oper !== "") && (oper !== "=")) {
        debugger
        FirstVal = `${FirstVal}${oper}${SecondVal}=`;
        SecondVal = String(calcResult);
        setHistory([...history, [FirstVal ,SecondVal]]);
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

    setLastButtonEqual(false);
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
  //плюс минус
  const plusMinus = () => {
    if (result !== "0") {
      result.includes("-") ? setResult(result.replace("-", "")) : setResult("-".concat(result));
    }
  }
  //история
  const historyHandle = (el) => {
    //после нажатия на дивку , значения переносятся в калькулятор
    setFirstVal(el[0]);
    setResult(el[1]);

    setLastButtonEqual(true);
    setLastButtonOperator(false);
  }
  
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
          {
            history.map((el, index) => {
              return <HistoryElement key={index} historyElement={el} historyHandle={()=> {historyHandle(el)} } />
            })
          }
        </div>
        <button onClick={() => { setHistory([]) }}>clear history</button>

      </div>

    </div>
  )

}






export default App;
