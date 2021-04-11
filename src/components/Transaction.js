import React from 'react'

const Transaction = (props) => {
    const sign = props.transaction.amount < 0 ? '-' : '+'
    return (
        <div>
            <li className={props.transaction.amount < 0 ? 'minus' : 'plus'}>{props.transaction.text} <span>{sign}${Math.abs(props.transaction.amount)}</span><button className="delete-btn">x</button></li>
        </div>
    )
}

export default  Transaction