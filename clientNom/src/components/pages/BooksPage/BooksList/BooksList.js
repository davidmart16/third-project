import { Component } from "react";
import {Container, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
import BooksService from "../../../../services/books.service"
import BookItem from "../BookItem/BookItem";


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
            this.sortByFragments()
        })
        .catch(err => console.log(err))
    }

    
    displayBooks = () => {
        return(
            this.state.books ?
                this.state.books.map((book, idx) => {
                    return <BookItem key={`${idx}-${book._id}`} 
                    book={book} 
                    loggedUser={this.props.loggedUser}/>
                }) : 
                <p>Cargando...</p>
        )

    }

    sortByFragments= () => {

        const newState = this.state.books
        this.setState({

            ...this.state,
            books: newState.sort(((book1, book2) => book2.fragments.length - book1.fragments.length))
        })
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