import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import BooksService from '../../../../services/books.service';
import APIBooksService from '../../../../services/apibooks.service';


const apiBookService = new APIBooksService();
const bookService = new BooksService();


function BookAPIDetails() {

    const [book, setBook] = useState(null)
    const [bookFromApi, setBookFromApi] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        getBook()
    }, [])

//   async componentDidMount() { //cambiar lo de async? guardar y luego probar
    
//     await this.getBook()
//     this.createTheBook()

//   }

  const getBook = () => {

    return apiBookService.getOneBook(id)
    .then(res => {
        let book = {}
        if (res.data.length > 1){
            const filterBook = res.data.filter(book => book.id === id )
            book = {...filterBook[0]}
        } else {
            book = {...res.data[0]}
        }
        setBookFromApi(book)
        createTheBook()
    })
    .catch(err => console.error(err))

  }

  const createTheBook = () => {
    const bookModel = {bookIdApi: bookFromApi?.id, name: bookFromApi?.volumeInfo?.title}
    bookService.createBook(bookModel)
    .then(book => 
        setBook(book)
    )
    .catch(err => console.error(err))

  }

    return (
        <>
            <Container>
                {bookFromApi ?
                <Row>

                    <Col>
                        <h3>{bookFromApi.volumeInfo.title}</h3>
                        {bookFromApi.volumeInfo.description ? 
                        <p>{bookFromApi.volumeInfo.description}</p>
                        : <p>No hay descripcion</p>
                        }
                        <p>{bookFromApi.volumeInfo.authors[0]}</p>
                        <h4>Paginas: {bookFromApi.volumeInfo.pageCount}</h4>
                    </Col>

                    <Link to={`/crear-fragmento/${bookFromApi.id}`}>
                        <Button variant='primary' >Añade otro fragmento</Button>
                    </Link>
                    {/* <Link to="/fragmentos">
                        <Button>Ver fragmentos</Button>
                    </Link> */}
                    <Link to="/">
                        <Button>volver</Button>
                    </Link>
                    
                </Row>

                : 
                <h3>Cargando...</h3>
                }
            </Container>
    </>
    )
}

export default BookAPIDetails