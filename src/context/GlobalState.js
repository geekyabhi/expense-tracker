import React ,{createContext,useReducer} from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'
const url=`https://expense-tracker-backend-abhi.herokuapp.com`
const initialState={
    transactions:[],
    error:null,
    loading:true,
}
export const GlobalContext=createContext(initialState)

export const GlobalProvider=({children})=>{
    const [state,dispatch]=useReducer(AppReducer,initialState)

    //Action

    async function getTransaction(){
        try{
            const res=await axios.get(`${url}/transactions`)
            dispatch({
                type:'GET_TRANSACTION',
                payload:res.data.data
            })
        }catch(e){
            dispatch({
                type:'TRANSACTION_ERROR',
                payload:e.response.data.error
            })
        }
    }

    async function deleteTransaction(id){
        try{
            await axios.delete(`${url}/delete/${id}`)        
            dispatch({        
                type:'DELETE_TRANSACTION',
                payload:id
            })
        }catch(e){
            dispatch({
                type:'TRANSACTION_ERROR',
                payload:e.response.data.error
            })
        }
    }

    async function addTransaction(transaction){
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        try{
            const res=await axios.post(`${url}/add`,transaction,config)
            dispatch({
                type:'ADD_TRANSACTION',
                payload:res.data.data
            })
        }catch(e){
            dispatch({
                type:'TRANSACTION_ERROR',
                payload:e.response.data.error
            })
        }
    }

    return (
        <GlobalContext.Provider value={{
            transactions:state.transactions,
            error:state.error,
            loading:state.loading,
            deleteTransaction,
            addTransaction,
            getTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}