import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthService from '../../../services/auth.service'
import SearchBar from '../SearchBar/SearchBar'

const authService = new AuthService()


export default function Navigator(props) {
  const logout = () => {
    authService.logout()
      .then(res => props.storeUser(null))
      .catch(err => console.log(err))
  }

  return (
    <Navbar bg="light" expand="md" className="mb-5">
      <Container>
        <Navbar.Brand href="/">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">Home</Link>

            {props.loggedUser ?
              <>
                <Link className="nav-link" to="/perfil">Mi perfil</Link>
                <Link className="nav-link" to="/crear-audio">Subir audio</Link>
                <span className="nav-link" onClick={logout}>Logout</span>

              </>
              :
              <>
                <Link className="nav-link" to="/registro">Registro</Link>
                <Link className="nav-link" to="/iniciar-sesion">Iniciar sesión</Link>
              </>
            }

          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand>
        <SearchBar ></SearchBar>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}