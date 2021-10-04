import { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import APIBooksService from '../../../services/apibooks.service'


class BooksAPIPage extends Component{
    constructor(props){
        super()

        this.state={
            booksApi: null
        }

    }

    apibookService = new APIBooksService()
    
    componentDidMount(){
        this.getBooks()
    }
    

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.match.params.text !== this.props.match.params.text) this.getBooks()
    }

                    
    getBooks(){
        
        const searchValue = this.props.match.params.text
        this.apibookService.getBooks(searchValue)
        .then(res => {
            this.setState({
                ...this.state,
                booksApi: res.data
            })
        })
        .catch(err => console.error(err))
        
    }


    displayBooks = () => {
        return(
            this.state.booksApi ?
                this.state.booksApi.map(book => {
                    console.log(book)
                    return (
                        <Col md={6}>
                            <h3>{book.volumeInfo.title}</h3>

                                {/* <image src={`${book.volumeInfo.imageLinks?.thumbnail}`}></image> */}

                            {book.volumeInfo.description ? 
                            <p>{book.volumeInfo.description}</p>
                            : <p>No hay descripcion</p>
                            }
                            <h4> - {book.volumeInfo.authors[0]} - </h4>
                            <h4>Paginas: {book.volumeInfo.pageCount}</h4>
                            <Link to={`/detalles/${book.id}`}>
                                <Button>hara cosas, como llevarte a narnia</Button>
                            </Link>
                            <hr/>
                        </Col>
                    )
                }) : 
                <p>Cargando...</p>
        )
    }


    render(){

        return (
        <Container>
            <Row>

            {this.state.booksApi ? 
            
            this.displayBooks()
            :
            <p>cargando...</p>
            }
            <hr/>
            

            </Row>
        </Container>
        )
    }

}

export default BooksAPIPage