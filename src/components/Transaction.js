import axios from 'axios'
import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
const Transaction = (props) => {
    const sign = props.transaction.amount < 0 ? '-' : '+'
    const currentUser=props.currentUser
    
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState('')
    const deleteTransaction=async(id)=>{
        const config = {
            headers: {
            'Content-type':'application/json',
            Authorization:`Bearer ${currentUser.token}` 
            },
        }
        try{    
            setloading(true)
            await axios.delete(`https://expense-tracker-backend-abhi.herokuapp.com/api/transactions/${id}`,config)
            setloading(false)
            props.settempChanges(!props.tempChanges)
        }catch(e){
            console.log(e)
            setloading(false)
            seterror('Cant Remove')
        }
    }

    return (
        <div>
            <li className={props.transaction.amount < 0 ? 'minus' : 'plus'}>
                {error?<Alert variant="danger"></Alert>:null}
                {props.transaction.text} 
                <span>
                    {sign}${Math.abs(props.transaction.amount)}
                </span>
                <button className="delete-btn" onClick={()=>deleteTransaction(props.transaction._id)} disabled={loading}>
                    x
                </button>
            </li>
        </div>
    )
}

export default  Transaction