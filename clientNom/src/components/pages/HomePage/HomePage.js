
import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AudioList from '../AudiosPage/AudiosList/AudiosList'
import BooksList from '../BooksPage/BooksList/BooksList'

function HomePage(props) {
  return (
    <>
  
      <Container style={{ minHeight: "100vh" }}>
        <h1>Bienvenid@ a La Voz de las Palabras</h1>
        <section className='myRow'>
          <div>
            <Link to="/libros">
              <Button>Ver libros</Button>
            </Link>
          </div>

          <div>
            <Link to="/audios">
              <Button>Ver audios</Button>
            </Link>
          </div>
        </section>
        <br/>
        {props.loggedUser ? 
          <div className='homepage'>
              <Link to="/perfil">
                <Button>Mi perfil</Button>
              </Link>
          </div>
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
      </Container>
    
  
        <BooksList loggedUser= {props.loggedUser}/>
    
  
        <AudioList loggedUser={props.loggedUser} storeUser={props.storeUser} ></AudioList>
    

    </>
  )
}

export default HomePage