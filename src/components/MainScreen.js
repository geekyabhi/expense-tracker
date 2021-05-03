import React, { useState } from 'react'
import { useHistory } from 'react-router'
import AddTransaction from './AddTransaction'
import Balance from './Balance'
import Heading from './Heading'
import IncomeExpenses from './IncomeExpenses'
import TransactionList from './TransactionList'

const MainScreen = ({currentUser}) => {

    const history=useHistory()
    
    const [tempChanges1, settempChanges1] = useState(false)

    if(!currentUser){
        history.push('/login')
    }
    return currentUser?(
        <div>
            <Heading></Heading>
            <div className="innerClass">
                <Balance currentUser={currentUser} tempChanges1={tempChanges1}></Balance>
                <IncomeExpenses currentUser={currentUser} tempChanges1={tempChanges1}></IncomeExpenses>
                <TransactionList currentUser={currentUser} settempChanges1={settempChanges1} tempChanges1={tempChanges1}></TransactionList>
                <AddTransaction currentUser={currentUser} settempChanges1={settempChanges1} tempChanges1={tempChanges1}></AddTransaction>
            </div>
        </div>
    ):null
}

export default MainScreen
