import axios from 'axios'
import React,{useEffect, useState}  from 'react'
import Transaction from './Transaction'

const TransactionList = ({currentUser,tempChanges1}) => {

    const [transactions, settransactions] = useState([])
    const [, seterror] = useState(null)
    const [, setloading] = useState(true)
    const [tempChanges, settempChanges] = useState(false)

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
                const data=await axios.get('/api/transactions',config)
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
    }, [tempChanges,tempChanges1])

    return (
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction=>(<Transaction key={transaction._id} transaction={transaction} currentUser={currentUser} settempChanges={settempChanges} tempChanges={tempChanges}></Transaction>))}
            </ul>
        </>
    )
}

export default TransactionList