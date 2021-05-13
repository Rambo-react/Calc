import style from "./HistoryElement.module.css"

const HistoryElement = (props) => {


    return (
        <div className={style.historyElement} onClick={props.historyHandle}>
            <input className={style.small} readOnly={true} value={props.historyElement[0]} />
            <input readOnly={true} value={props.historyElement[1]} />
        </div>
    )
}

export default HistoryElement;