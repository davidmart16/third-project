import { useEffect, useState } from "react";
import {Container, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
import BooksService from "../../../../services/books.service"
import BookItem from "../BookItem/BookItem";

const bookService = new BooksService()

function BooksList (props) {

    const [books, setBooks] = useState(null)

    useEffect(() => {
        bookService.getBooks()
        .then(res => {
            sortByFragments(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    const sortByFragments= (books) => {
        setBooks(books.sort(((book1, book2) => book2.fragments.length - book1.fragments.length)))
        
    }

    // const booksWithFragments = (books) => {
    //     setBooks(books.filter(book => book.fragments.length !== 0 ))
    // }
    
    const displayBooks = () => {
        return(
            books ?
                books.map((book, idx) => {
                    return (<BookItem key={`${idx}-${book._id}`} 
                    book={book} 
                    idx={idx}
                    loggedUser={props.loggedUser}/>)
                }) : 
                <p>Cargando...</p>
        )

    }

    return (
        <Container>
            <h2>Listado de Libros</h2>
            <Row>
                {displayBooks()}
            </Row>
            <hr/>
            
            {!props.loggedUser && <h5>Inicia sesion para subir tus audios de los fragmentos que tu quieras</h5>}
        </Container>
    )
}

export default BooksList