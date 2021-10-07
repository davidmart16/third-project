
import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AudioList from '../AudiosPage/AudiosList/AudiosList'
import BooksList from '../BooksPage/BooksList/BooksList'
import './HomePage.css'

function HomePage(props) {
  return (
    <>
  
      <Container style={{ minHeight: "100vh" }}>
        <h1>Bienvenid@ a La Voz de las Palabras</h1>
        <Row className='homepage'>
          <Col className='bloques'>
            <Link to="/libros">
              <Button>Ver libros</Button>
            </Link>
          </Col>
          <Col className='bloques'>
            <Link to="/audios">
              <Button>Ver audios</Button>
            </Link>
          </Col>
        </Row>
        <br/>
        {props.loggedUser ? 
          <div className='homepage3'>
              <Link to="/perfil">
                <Button>Mi perfil</Button>
              </Link>
          </div>
          : 
          <Row>
            <Col className='homepage2'>
              <Link to="/registro">
                <Button>Registrate</Button>
              </Link>
            </Col>
            <Col className='homepage2'>
              <Link to="/iniciar-sesion">
                <Button>Inicia Sesion</Button>
              </Link>
            </Col>
          </Row> 
        }
      </Container>
  
        <BooksList loggedUser= {props.loggedUser}/>
    
  
        <AudioList loggedUser={props.loggedUser} storeUser={props.storeUser} ></AudioList>
    

    </>
  )
}

export default HomePage