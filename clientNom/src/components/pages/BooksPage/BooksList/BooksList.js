import { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
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
                        <Col md={4}>
                                <h2>{book.name}</h2>
                                {/* {book.fragment?.map(fragment => <p>hola{fragment.content}</p>               
                                )} */}
                                <Link to={`/libros/${book._id}`}>
                                    <Button>Detalles</Button>
                                </Link>
                            </Col>
                    )
                }) : 
                <p>Cargando...</p>
        )

    }

    render() {

        return (
        <>
            <h2>Listado de Libros</h2>
            <hr/>
            <Row>
                {this.displayBooks()}
            </Row>
            
        </>
        )
    }   
}

export default BooksList