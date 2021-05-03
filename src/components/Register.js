import React, { useState} from 'react'
import Loader from '../components/Loader'
import { Col, Row,Button, Form, Alert} from 'react-bootstrap'
import { Link ,useHistory} from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
const Register = () => {
    const history=useHistory()
    const [name, setname] = useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(false)

    const submitHandler=async (e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            seterror('Password do not match')
        }
        else{
        try{
            setloading(true)
            const data=await axios.post('/api/users',{name,email,password})
            data.data?localStorage.setItem('user',JSON.stringify(data.data)):localStorage.setItem('expenseUser','')
            seterror(data.error)
            setloading(false)
            history.push('/')
        }catch(e){
            console.log(e)
            setloading(false)
            seterror('Error in signup')
        }}
    }

    return(
        <>
            <FormContainer>
                <h1>Sign Up</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                {loading && <Loader></Loader>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder="Enter Name" 
                            value={name} 
                            onChange={(e)=>setname(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
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
                    <Form.Group controlId='confirmpassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder="Renter password" 
                            value={confirmPassword} 
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary" disabled={loading}>Sign In</Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Already have an account ?{' '} 
                        <Link to='/login'>Login</Link>
                    </Col>
                </Row>
            </FormContainer>
        </>
    )
}

export default Register