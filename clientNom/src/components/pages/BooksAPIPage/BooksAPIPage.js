import { Component } from "react";
import { Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import APIBooksService from '../../../services/apibooks.service'
import PruebaBooks from "../PruebaBooks/PruebaBooks";


class BooksAPIPage extends Component{
    constructor(props){
        super()

        this.state={
            books: null
        }

        console.log(props)
    }



      
    apibookService = new APIBooksService()
    
    
    componentDidMount(){
        //didUpdate (posible bucle infinito ;) )
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
                libros: res.data
            })
            console.log(this.state.libros)
        })
        .catch(err => console.error(err))
        
    }


    displayBooks = () => {
        return(
            this.state.libros ?
                this.state.libros.map(libro => {
                    console.log(libro)
                    return (
                        
                        <Col md={6}>
                            <h3>{libro.volumeInfo.title}</h3>
                            <p>{libro.volumeInfo.description}</p>
                            <h4>Paginas: {libro.volumeInfo.pageCount}</h4>
                            <Link>
                                <Button>hara cosas, como llevarte a narnia</Button>
                            </Link>
                            <hr/>
                        </Col>
                          
                        
                    )
                }) : 
                <p>Cargando...</p>
        )

    }



    // render(){

    //     return (
    //     <Container>
    //         <Row>

    //         {this.state.libros ? 
            
    //         this.displayBooks()
    //         :
    //         <p>cargando...</p>
    //         }

    //         <hr/>

    //         {/* <Col md={6}>
    //             <image src={`${libro.volumeInfo.imageLinks?.thumbnail}`}></image>
    //         </Col> */}

    //         </Row>
    //     </Container>
    //     )
    // }

    render(){

        return (
            <>
            <h1>IR A NARNIA</h1>
            
            <PruebaBooks {...this.props}></PruebaBooks>
            </>
        )
    }
}

export default BooksAPIPage