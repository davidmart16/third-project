import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import AuthService from '../../../services/auth.service'
import './Signup.css'

  const authService = new AuthService()

function Signup(props) {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [email, setEmail] = useState('')

  const handleInput = (e) => {
    const { name, value } = e.target
    if (name === 'username') setUsername(value)
    else if (name === 'password') setPassword(value)
    else if (name === 'email') setEmail(value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    authService.signup(username, password, email)
      .then(res => props.history.push("/"))
      .catch(err => console.log(err))
  }

    return (
      <Container className='text'>
        <Form className='form' onSubmit={handleFormSubmit}>
        
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" value={username} onChange={handleInput} type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" value={email} onChange={handleInput} type="text" placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" value={password} onChange={handleInput} type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    )
}

export default Signup