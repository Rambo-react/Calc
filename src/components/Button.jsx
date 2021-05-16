import style from './Button.module.css'

const Button = (props) => {
  // debugger
  let styles;
  switch (props.child) {
    case "=" : styles=`${style.equal}`
     break;
    case "backspace" : styles=`${style.backspace}`
     break;
    case (props.child.match(/[0-9.]/) ? props.child : true) : styles=`${style.numButton}` 
      break;
    case (props.child.match(/\+\/-/) ? props.child : true) : styles=`${style.numButton}` // "+/-"
      break;
    default : styles=`${style.button}`
      break;
  }
  // let stylesButton = "styles." + props.styles.join(' styles.')  
  return (
            <button onClick={props.handleClick} className={styles}>{props.child === "backspace" ? "" : props.child}</button>
      )
  }
// `${style.button} ${style.numButton}`
// {style.button}
  export default Button;