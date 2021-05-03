import axios from 'axios'
import React ,{ useState} from 'react'
import { Alert, Button, Form } from 'react-bootstrap'

const AddTransaction = ({currentUser,settempChanges1,tempChanges1}) => {

    const [text, setText] = useState('')
    const [amount, setAmount] = useState(0)
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(false)

    const onSubmit=async (e)=>{
        e.preventDefault()
        const newTransaction={
            id:Math.floor(Math.random() * 100000000),
            text,
            amount:+amount
        }
        const config = {
            headers: {
            'Content-type':'application/json',
            Authorization:`Bearer ${currentUser.token}` 
            },
        
        }
        try{
            const data = await axios.post('/api/transactions',newTransaction,config)
            seterror(data.error)
            setloading(false)
            settempChanges1(!tempChanges1)
        }catch(e){
            console.log(e)
            setloading(false)
            seterror('Cant be added')
        }
    }

    return (
        <div>
            <h3>Add new transaction</h3>
            {error?<Alert variant="danger">{error}</Alert>:null}
            <Form onSubmit={onSubmit}>
                <Form.Group controlId='text'>
                        <Form.Label>Text</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder="Enter text.." 
                            value={text} 
                            onChange={(e)=>setText(e.target.value)}
                        >
                        </Form.Control>
                </Form.Group>
                <Form.Group controlId='number'>
                        <Form.Label>Amount <br />(negative - expense, positive - income)</Form.Label>
                        <Form.Control type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Enter amount..." >
                        </Form.Control>
                </Form.Group>
                <Button className="btn" disabled={loading} type="submit">Add transaction</Button>
            </Form>
        </div>
    )
}

export default AddTransaction