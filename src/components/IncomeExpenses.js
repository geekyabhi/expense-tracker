import axios from 'axios'
import React, { useState,useEffect } from 'react'
const IncomeExpenses = ({currentUser,tempChanges1}) => {
    const [transactions, settransactions] = useState([])
    const [, seterror] = useState(null)
    const [, setloading] = useState(true)
    
    useEffect(() => {
        const getTransactions=async ()=>{        
            const config = {
                headers: {
                'Content-type':'application/json',
                Authorization:`Bearer ${currentUser.token}` 
                },
            }
            try{
                setloading(true)
                const data=await axios.get('https://expense-tracker-backend-abhi.herokuapp.com/api/transactions',config)
                settransactions(data.data.data)
                setloading(false)
            }catch(e){
                console.log(e)
                seterror('Unable to count')
                setloading(false)
            }
        }
        getTransactions()
        // eslint-disable-next-line
    }, [tempChanges1])
    const amounts = transactions.map(transaction => transaction.amount)
    // const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2)
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *-1).toFixed(2)

    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">{income}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p  className="money minus">{expense}</p>
            </div>
        </div>
    )
}
export default IncomeExpenses