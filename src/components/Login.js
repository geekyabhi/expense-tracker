import React, {useState} from 'react'
import Loader from '../components/Loader'
import { Col, Row,Button, Form, Alert} from 'react-bootstrap'
import { Link ,useHistory} from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
const LoginScreen = (props) => {
    // const history=useHistory()

    const history=props.history
    const currentUser=props.currentUser

    console.log(props)

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(false)

    const submitHandler=async (e)=>{
        e.preventDefault()
        try{
            setloading(true)
            const data=await axios.post('/api/users/login',{email,password})
            history.push("/")
            console.log(history)
            data.data?localStorage.setItem('expenseUser',JSON.stringify(data.data)):localStorage.setItem('expenseUser','')
            seterror(data.error)
            setloading(false)
        }catch(e){
            console.log(e)
            setloading(false)
            seterror('Error in login',e)
        }
    }

    return currentUser?<></>:(
        <>
            <FormContainer>
                <h1>Sign In</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                {loading && <Loader></Loader>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                            type='email' 
                            placeholder="Enter Email" 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder="Enter password" 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                        >
                            
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary" disabled={loading}>Sign In</Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New Customer ?{' '} 
                        <Link to='/register'>Register</Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default LoginScreen
