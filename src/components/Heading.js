import React from 'react'
import {Container,Nav,Navbar, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
const Heading = () => {
    
    const data=localStorage.getItem('expenseUser')
    let currentUser=JSON.parse(data)
    const logoutHandler=()=>{
        localStorage.removeItem('expenseUser')
        window.location.reload()
    }
    return (
        <>
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>ExpenseT</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {currentUser ? (
                                <NavDropdown title={currentUser.name} id="username">
                                    {/* <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer> */}
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ):(
                                <LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user"></i> Sign In</Nav.Link>    
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
        </>
    )
}

export default Heading
