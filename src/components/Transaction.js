import React, { useContext } from 'react'
import {GlobalContext} from '../context/GlobalState'
const Transaction = (props) => {
    const sign = props.transaction.amount < 0 ? '-' : '+'
    const {deleteTransaction}=useContext(GlobalContext)
    return (
        <div>
            <li className={props.transaction.amount < 0 ? 'minus' : 'plus'}>
                {props.transaction.text} 
                <span>
                    {sign}${Math.abs(props.transaction.amount)}
                </span>
                <button className="delete-btn" onClick={()=>deleteTransaction(props.transaction._id)}>
                    x
                </button>
            </li>
        </div>
    )
}

export default  Transaction