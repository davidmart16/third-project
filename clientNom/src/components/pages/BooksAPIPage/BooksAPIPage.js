import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import APIBooksService from '../../../services/apibooks.service'

const apibookService = new APIBooksService()
 
function BooksAPIPage(props){

    const [booksApi, setBooksApi] = useState(null)

    useEffect(() => {
        getBooks()
    })

    // componentDidUpdate = (prevProps, prevState) => {
    //     if (prevProps.match.params.text !== this.props.match.params.text) this.getBooks()
    // }     

    const getBooks = () => {
        
        const searchValue = props.match.params.text
        apibookService.getBooks(searchValue)
        .then(res => {
            setBooksApi(res.data)
        })
        .catch(err => console.error(err))
        
    }


    const displayBooks = () => {
        return(
            booksApi ?
                booksApi.map((book, idx) => {
                    return (
                        <Col key={`${idx}-${book.volumeInfo.title}-${book.volumeInfo.pageCount}`} md={6}>
                            <h3>{book.volumeInfo.title}</h3>

                            <Image src={book.volumeInfo.imageLinks?.thumbnail ? book.volumeInfo.imageLinks.thumbnail : 'https://www.esferalibros.com/assets/corporativa/images/portada_no_disponible.png'}></Image>
                            
                            {book.volumeInfo.description ? 
                            <p>{book.volumeInfo.description}</p>
                            : <p>No hay descripcion</p>}
                                
                            {book.volumeInfo.authors ?  book.volumeInfo.authors.map(author => <h4> - {author} - </h4>) : <p>Sin autores conocidos</p>}

                            <h4>Paginas: {book.volumeInfo.pageCount}</h4>
                            <Link to={`/detalles/${book.id}`}>
                                <Button>Mostrar Detalles del libro</Button>
                            </Link>
                            <hr/>
                        </Col>
                    )
                }) : 
                <p>Cargando...</p>
        )
    }

        return (
            <Container>
                <Row>
                    {booksApi ? displayBooks() : <p>Cargando...</p> }
                    <hr/>
                </Row>
            </Container>
        )
}

export default BooksAPIPage