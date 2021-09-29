import React, { Component } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import BooksService from '../../../../services/books.service';

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
            <Col md={6}>
                <h1>Libro {this.state.book.name}</h1>
                
                <ul>Fragmentos: 
                {this.state.book.fragment?.map(elem => {
                    return (<il>{elem.content}</il>)
                })}
                </ul>
            </Col>
          </Row>

          : 
          <h3>Cargando...</h3>
        }
      </Container>
    )
  }
}

export default BookDetails