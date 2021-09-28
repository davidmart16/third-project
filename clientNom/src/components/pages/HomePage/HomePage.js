
import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <Container style={{ minHeight: "100vh" }}>
      <h1>Bienvenid@ a La Voz de las Palabras</h1>
      <h3>MERN Application</h3>

      <Link to="/libros">
        <Button>Ver libros</Button>
      </Link>
      <Link to="/audios">
        <Button>Ver audios</Button>
      </Link>
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
    </Container>
  )
}

export default HomePage