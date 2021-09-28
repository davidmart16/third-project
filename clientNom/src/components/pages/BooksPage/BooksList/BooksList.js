import { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import BooksService from "../../../../services/books.service"


class BooksList extends Component {
    constructor(){
        super();

        this.state= {
            books: null
        }
        this.bookService = new BooksService()
    }

    componentDidMount(){
        this.bookService.getBooks()
        .then(res => {
            console.log(res.data)
            this.setState({
                ...this.state,
                books: res.data
            })
        })
    }
        displayBooks = () => {
        return(
            this.state.books ?
                this.state.books.map(book => {
                    return (
                        <Row>
                            {/* <Col>
                                <img className='img-home' src={book.image_url} alt='no es una imagen'></img>
                            </Col> */}
                            <Col>
                                <h2>{book.name}</h2>
                                {book.fragment?.map(fragment => <p>hola{fragment.content}</p>               
                                )}
                                <Link to={`/libros/${book.id}`}>
                                    <Button>Detalles</Button>
                                </Link>
                            </Col>
                        </Row>
                    )
                }) : 
                <p>Cargando...</p>
        )

    }

    render() {

        return (
            <>
                <div>
                    hola buenas vengo de la rama de dani&jesus y somos libros
                </div>
                <Container>
                    {this.displayBooks()}
                </Container>
            </>
        )
    }   
}

export default BooksList