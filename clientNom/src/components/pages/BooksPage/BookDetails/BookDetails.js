import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import BooksService from '../../../../services/books.service';
import FragmentsList from '../../FragmentsPage/FragmentsList/FragmentsList';
import './BookDetails.css'

const bookService = new BooksService();

function BookDetails () {

  const [book, setBook] = useState(null)  
  const { id } = useParams()

  useEffect(() => {
    bookService.getOneBook(id)
    .then(res => {
      setBook(res.data.book)
    })
    .catch(err => console.error(err))
    
  }, [])


    return (
      <Container className='book-details'>
        {
          book ?
          <Row>
            <Col>
                <h1>Libro: {book.name}</h1>
                  <FragmentsList book={book}/>
            </Col>
            <Link className='button-details' to={`/crear-fragmento/${book._id}`}>
              <Button variant='primary' >Añade otro fragmento</Button>
            </Link>
            <Link  className='button-details2' to="/">
              <Button>volver</Button>
            </Link>
            
          </Row>

          : 
          <h3>Cargando el libro...</h3>
        }
      </Container>
    )
}

export default BookDetails