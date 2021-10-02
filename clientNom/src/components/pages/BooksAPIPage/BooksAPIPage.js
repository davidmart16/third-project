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
        // console.log('soy las prevProps: ', prevProps.match.params)
        // console.log('soy las this.props: diferenciame' ,this.props.match.params)
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
            console.log(this.state.booksApi)
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
                            <p>{book.volumeInfo.description}</p>
                            <h4>Paginas: {book.volumeInfo.pageCount}</h4>
                            <Link to='/'>
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
            {/* <Col md={6}>
                <image src={`${book.volumeInfo.imageLinks?.thumbnail}`}></image>
            </Col> */}

            </Row>
        </Container>
        )
    }

    // render(){

    //     return (
    //         <>
    //         <h1>IR A NARNIA</h1>
            
    //         <PruebaBooks {...this.props}></PruebaBooks>
    //         </>
    //     )
    // }
}

export default BooksAPIPage