
import React from 'react';
import './App.css';
import DivideButton from './components/DivideButton';
import MinusButton from './components/MinusButton';
import MultiplyButton from './components/MultiplyButton';
import NumberButton from './components/NumberButton';
import PlusButton from './components/PlusButton';

class App extends React.Component {

  state = {
    history: [],
    resultNow: 0,
    lastSymbolOperator: false,
    predValue: null,
    operators: ['+', '-', '*', '/']
  }

  clickNumberButton = (e) => {
    console.log('num')
    this.setState({
      ...this.state,
      resultNow: this.state.resultNow === 0 ?
       e.currentTarget.innerText : this.state.resultNow + e.currentTarget.innerText,
       lastSymbolOperator: false
    }) 
  }

  EqualMath = (stringMath, separator) => {
    debugger
    let [firstVal, lastVal] = stringMath.split(separator);
    return `${Number(firstVal)} ${separator} ${Number(lastVal)}` 
  }

  clickPlusButton = (e) => {
    //если в строке есть оператор, то выполняем вычисление
    debugger
    console.log('+')
    
    //если последний символ не оператор, и строка содержит оператор, но сейчас нажали на оператор, то вычисляем результат
    if ((!this.state.lastSymbolOperator) && (this.state.resultNow.includes('')))  {

    } else {

    }

    this.setState({
      ...this.state,
      predValue: this.state.resultNow,
      lastSymbolOperator: true,
      resultNow: this.state.resultNow + "+"

    })

  }




  render() {
    return (
      <div className="App">

        <Calculator clickPlusButton={this.clickPlusButton} clickNumberButton={this.clickNumberButton}  resultNow={this.state.resultNow} />

      </div>
    )
  }

}



const Calculator = (props) => {

  return (
    <div>

      <div>
        <input />
        <input placeholder='0' value={props.resultNow} readOnly={true} />
      </div>
      <div>
        <PlusButton clickPlusButton= {props.clickPlusButton}/>
        <MinusButton />
        <MultiplyButton />
        <DivideButton />
      </div>
      <div>
        <NumberButton clickNumberButton={props.clickNumberButton} num={7} />
        <NumberButton clickNumberButton={props.clickNumberButton} num={8} />
        <NumberButton clickNumberButton={props.clickNumberButton} num={9} />
      </div>
      <div>
        <NumberButton clickNumberButton={props.clickNumberButton} num={4} />
        <NumberButton clickNumberButton={props.clickNumberButton} num={5} />
        <NumberButton clickNumberButton={props.clickNumberButton} num={6} />
      </div>
      <div>
        <NumberButton clickNumberButton={props.clickNumberButton} num={1} />
        <NumberButton clickNumberButton={props.clickNumberButton} num={2} />
        <NumberButton clickNumberButton={props.clickNumberButton} num={3} />
      </div>

    </div>
  )
}



export default App;
