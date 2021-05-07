import style from './Button.module.css'


const Button = (props) => {
    return (
      
      <button onClick={props.handleClick} className={style.button}>{props.child}</button>
  
    )
  }

  export default Button;