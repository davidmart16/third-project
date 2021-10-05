import React, { Component } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BooksService from '../../../../services/books.service';
import APIBooksService from '../../../../services/apibooks.service';


class BookAPIDetails extends Component {
  constructor(props){
    super(props);

    this.state = {
      book: null,
      bookFromApi: null
    }

    this.apiBookService = new APIBooksService();
    this.bookService = new BooksService();
  }

  async componentDidMount() { //cambiar lo de async? guardar y luego probar
    
    await this.getBook()
    this.createTheBook()

  }


  getBook() {

    const { id } = this.props.match.params;
    return this.apiBookService.getOneBook(id)
    .then(res => {
        let book = {}

        if (res.data.length > 1){
            const filterBook = res.data.filter(book => book.id === id )
            book = filterBook[0]
        } else {
            book = res.data[0]
        }

        this.setState({
            ...this.state,
            bookFromApi: book
        })
        
    })
    .catch(err => console.error(err))

  }

  createTheBook(){
      const book = {bookIdApi: this.state.bookFromApi?.id, name: this.state.bookFromApi?.volumeInfo?.title}
    this.bookService.createBook(book)
    .then(book => 
        this.setState({
            ...this.state,
            book: book
        })
    )
    .catch(err => console.error(err))

  }

    render(){

        return (
            <>
                <Container>
                    {this.state.bookFromApi ?
                    <Row>

                        <Col>
                            <h3>{this.state.bookFromApi.volumeInfo.title}</h3>
                            {this.state.bookFromApi.volumeInfo.description ? 
                            <p>{this.state.bookFromApi.volumeInfo.description}</p>
                            : <p>No hay descripcion</p>
                            }
                            <p>{this.state.bookFromApi.volumeInfo.authors[0]}</p>
                            <h4>Paginas: {this.state.bookFromApi.volumeInfo.pageCount}</h4>
                        </Col>

                        <Link to={`/crear-fragmento/${this.state.bookFromApi.id}`}>
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

}

export default BookAPIDetails