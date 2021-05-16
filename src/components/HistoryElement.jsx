import style from "./HistoryElement.module.css"

const HistoryElement = (props) => {

    return (
        <div className={style.historyElement} onClick={()=> {props.historyHandle(props.historyElement)}}>
            <input className={`${style.firstValHistory} ${style.inputHistory}`} readOnly={true} value={props.historyElement[0]} />
            <input className={style.inputHistory} readOnly={true} value={props.historyElement[1]} />
        </div>
    )
}

export default HistoryElement;