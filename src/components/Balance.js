import axios from 'axios'
import React, { useEffect, useState } from 'react'
const Balance = ({currentUser,tempChanges1}) => {
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
    }, [tempChanges1])
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

    return (
        <>
            <h4>Your Balance</h4>
            <h1>$ {total}</h1>
        </>
    )
}
export default Balance