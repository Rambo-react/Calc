import React from 'react'
import style from './Button.module.css'

const Button =(props) => {
  // debugger
  let styles;
  switch (props.child) {
    case "=" : styles=`${style.equal}`
     break;
    case "backspace" : styles=`${style.backspace}`
     break;
     //если не найдёт строку из рег. выражения , то выдаст булевое знаение, а оно не может быть в props.child, по этому класс не добавится
    case Boolean(props.child.match(/[0-9.]/)) && props.child : styles=`${style.numButton}`  
      break;
    case Boolean(props.child.match(/\+\/-/)) && props.child : styles=`${style.numButton}` // "+/-"
      break;
    default : styles=`${style.button}`
      break;
  }
  // let stylesButton = "styles." + props.styles.join(' styles.')  
  return (
            <button onClick={ props.child.match(/[0-9]/) ? () => { props.handleClick(props.child) } : props.handleClick } className={styles}>{props.child === "backspace" ? "" : props.child}</button>
      )
  }
// `${style.button} ${style.numButton}`
// {style.button}
  export default Button;