import { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import BooksService from "../../../../services/books.service"


class BooksList extends Component {
    constructor(props){
        super(props);

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
                            <Container>
                                <Row>
                                    {book.fragments?.map(fragment => <Col md={11}>{fragment.content}</Col>)}
                                    {/* {this.props.loggedUser && */}
                                    <Link to={`/libros/${book._id}`}>
                                        <Button>Detalles</Button>
                                    </Link>
                                    {/* } */}
                                </Row>
                            </Container>
                        </Col>
                    )
                }) : 
                <p>Cargando...</p>
        )

    }

    render() {

        return (
        <Container>
            <h2>Listado de Libros</h2>
            <hr/>
            <Row>
                {this.displayBooks()}
            </Row>
            <hr/>
            
            {!this.props.loggedUser && <h5>Inicia sesion para subir tus audios de los fragmentos que tu quieras</h5>}
        </Container>
        )
    }   
}

export default BooksList