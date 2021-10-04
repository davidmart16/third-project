import React, { Component } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BooksService from '../../../../services/books.service';
import FragmentsList from '../../FragmentsPage/FragmentsList/FragmentsList';

class BookDetails extends Component {
  constructor(props){
    super(props);

    this.state = {
      book: null
    }

    this.bookService = new BooksService();
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.bookService.getOneBook(id)
    .then(res => {
      this.setState({
        ...this.state,
        book: res.data.book
      })
    })
    .catch(err => console.error(err))

  }

  render() {

    return (
      <Container>
        {
          this.state.book ?
          <Row>
            <Col>
                <h1>Libro: {this.state.book.name}</h1>
                {/* {this.state.book.fragment?.map(elem => {
                    return (<il>{elem.content}</il>)
                })} */}
                  <FragmentsList book={this.state.book}/>
            </Col>
            <Link to={`/crear-fragmento/${this.state.book._id}`}>
              <Button variant='primary' >Añade otro fragmento</Button>
            </Link>
            <Link to="/fragmentos">
              <Button>Ver fragmentos</Button>
            </Link>
            <Link to="/">
              <Button>volver</Button>
            </Link>
            
          </Row>

          : 
          <h3>Cargando el libro...</h3>
        }
      </Container>
    )
  }
}

export default BookDetails