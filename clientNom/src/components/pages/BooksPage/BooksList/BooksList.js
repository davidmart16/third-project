import { useEffect, useState } from "react";
import {Container, Row } from "react-bootstrap";
import BooksService from "../../../../services/books.service"
import BookItem from "../BookItem/BookItem";
import './BooksList.css'

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

    
    // const filterBooks = () => {
    //     books.filter( book => book.fragments.map)
    // }

    // const booksWithFragmentsValidated = (books) => {
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
        <Container className=''>
            <h2 className='list-title'>Listado de Libros</h2>
            <Row className='list'>
                {displayBooks()}
            </Row>            
            {!props.loggedUser && <h5 className='login'>Inicia sesion para subir audios de los fragmentos que tu quieras</h5>}
        </Container>
    )
}

export default BooksList