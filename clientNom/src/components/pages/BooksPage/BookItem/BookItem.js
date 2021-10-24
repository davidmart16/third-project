import { useEffect, useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// import APIBooksService from '../../../../services/apibooks.service'
import './BookItem.css'


// const apiBookService = new APIBooksService()

function BookItem (props) {

    const [book, setBook] = useState(null)



    useEffect(() => {
        if(book === props.book) return;
        setBook(props.book)
        // getOneBook(book?._id)
    }, [])

    // const getOneBook = (id) => {

    //     apiBookService.getOneBook(id)
    //     .then(res => {
    //      setBookApi(res.data.book) 
    //     })
    //     .catch(err => console.log(err))
        
    // }

    const displayBook = () => {

        return (
            book ? 
           <Col key={`${book.name}-${book._id}-${props.idx}`} md={4}>
                <Card className= 'book-item' >
                    <Card.Title className='card-title'>{book?.name}</Card.Title>
                        <Card.Body>
                        {/* <img src= {bookFromApi.volumeInfo?.thumbnails?.thumbnails} alt=''/>  */}
                        {book?.fragments.map(fragment => fragment.isValidated && <p>{fragment.content}</p>)}
                        {props.loggedUser &&
                        <Link to={`/libros/${book?._id}`}>
                            <Button>Detalles</Button>
                        </Link>
                        }
                        </Card.Body>
                </Card>
            </Col> :
            <p>Cargando...</p>
        )
    }

        return displayBook()

}

export default BookItem