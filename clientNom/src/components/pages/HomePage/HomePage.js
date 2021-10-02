
import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BooksList from '../BooksPage/BooksList/BooksList'

function HomePage(props) {
  return (
    <>
      <Container style={{ minHeight: "100vh" }}>
        <h1>Bienvenid@ a La Voz de las Palabras</h1>
        <Row>
          <Col>
            <Link to="/libros">
              <Button>Ver libros</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/prueba">
              <Button>Ver libros de la api</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/audios">
              <Button>Ver audios</Button>
            </Link>
          </Col>
        </Row>
        <br/>
        {props.loggedUser ? 
          <Row>
            <Col>
              <Link to="/perfil">
                <Button>Mi perfil</Button>
              </Link>
            </Col>
          </Row>
          : 
          <Row >
            <Col mt={60} className='bloques'>
              <Link to="/registro">
                <Button>Registrate</Button>
              </Link>
            </Col>
            <Col className='bloques'>
              <Link to="/iniciar-sesion">
                <Button>Inicia Sesion</Button>
              </Link>
            </Col>
          </Row> 
        }
        <BooksList loggedUser= {props.loggedUser}/>
      </Container>
    </>
  )
}

export default HomePage