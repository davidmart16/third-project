import { Component } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import APIBooksService from '../../../../services/apibooks.service'



class BookItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bookFromApi: null,
            book: null
        }
        this.apiBookService = new APIBooksService()

    }


    componentDidMount(){
        this.setState({
            ...this.state,
            book: this.props.book
        })
        this.getOneBook(this.state.book?._id)
    }

    getOneBook(id) {

        this.apiBookService.getOneBook(id)
        .then(res => {
            console.log('esto es la res data', res.data)
            this.setState({
            ...this.state,
            bookFromApi: res.data.book
            })
        })
        .catch(err => console.log(err))
        
    }

    displayBook(){

        return (

           <Col md={4}>
                <Card >
                    <Card.Title>{this.state.book?.name}</Card.Title>
                        <Card.Body>
                        {/* <img src= {this.state.bookFromApi.volumeInfo?.thumbnails?.thumbnails} alt=''/>  */}
                        {this.state.book?.fragments.map(fragment => fragment.isValidated && <p>{fragment.content}</p>)}
                        {this.props.loggedUser &&
                        <Link to={`/libros/${this.state.book?._id}`}>
                            <Button>Detalles</Button>
                        </Link>
                        }
                        </Card.Body>
                </Card>
            </Col>
        )
    }

    render(){

        return this.displayBook()
    }
}

export default BookItem