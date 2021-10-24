import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import AuthService from '../../../services/auth.service'
import './Login.css'

const authService = new AuthService()

function Login(props) {

  const [username, setUsername] = useState('')
  const [pwd, setPwd] = useState('')
  

  const handleInput = (e) => {
    const { name, value } = e.target
    if (name === 'username') setUsername(value)
    else if (name === 'pwd') setPwd(value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    authService.login(username, pwd)
      .then(res => {
        props.storeUser(res.data)
        props.history.push("/")
      })
      .catch(err => console.log(err))
  }

    return (
      <Container className='text'>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" value={username} onChange={handleInput} type="text" placeholder="Enter username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="pwd" value={pwd} onChange={handleInput} type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    )
}

export default Login