import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import APIBooksService from '../../../services/apibooks.service'



class PruebaBooks extends Component{
    constructor(){
        super()

        this.state={
            libros: null
        }

    }

    apibookService = new APIBooksService()


    componentDidMount(){
        this.apibookService.getBooks('sanderson')
        .then(res => {
            this.setState({
                ...this.state,
                libros: res.data
            })
        })
        .catch(err => console.error(err))
    }

    
    displayBooks = () => {
        return(
            this.state.libros ?
                this.state.libros.map(libro => {
                    console.log(libro.volumeInfo)
                    return (
                        <Row>
                        <Col md={12}>
                            <h3>{libro.volumeInfo.title}</h3>
                        </Col>
                        <Col  md={12}>
                            <p>{libro.volumeInfo.description}</p>
                        </Col>
                        <Col  md={12}>
                            <h4>Paginas: {libro.volumeInfo.pageCount}</h4>
                        </Col>
                            <hr/>

                        {/* <Col md={6}>
                            <image src={`${libro.volumeInfo.imageLinks?.thumbnail}`}></image>
                        </Col> */}
                        
                        </Row>
                    )
                }) : 
                <p>Cargando...</p>
        )

    }


    render(){

        return (
        <Container>
            {this.state.libros ? 
            
            this.displayBooks()
            :
            <p>cargando...</p>
            }

        </Container>
        )
    }
}

export default PruebaBooks