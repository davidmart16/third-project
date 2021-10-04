import { Button, Col, Container, Row } from "react-bootstrap";
import AudiosService from "../../../../services/audios.service";
import ReactAudioPlayer from 'react-audio-player';
import BooksService from "../../../../services/books.service";
import FragmentsService from "../../../../services/fragments.service";
import { Link } from "react-router-dom";

const { Component } = require("react");



class FragmentDetails extends Component{
    constructor(props){
        super(props)

        this.state = {
            fragment: null,
            book: null,
            fragmentAudios: null
        }

    this.fragmentService = new FragmentsService();
    this.bookService = new BooksService();
    this.audioService = new AudiosService()

    }

    async componentDidMount(){
        
        await this.getFragmentAndBook()
        this.state.fragment && this.getAudios()
            
    }

    getFragmentAndBook(){

        const { id } = this.props.match.params
        const info = {fragment: null}

        return this.fragmentService.getOneFragment(id)
        .then(res => {
            info.fragment = res.data.fragment
            return this.bookService.getOneBook(res.data.fragment.bookId)
        })
        .then(res => {
            this.setState({
                ...this.state,
                book: res.data.book,
                fragment: info.fragment
            })
        })
        .catch(err => console.error(err))

    }


        getAudios = () => {
            console.log('esto es el fragment del estado en la funcion de getAudios ---',this.state.fragment)
            this.audioService.getAudiosByFragment(this.state.fragment)
            .then(res => {
                console.log('estoy dentro del then',this.state.fragment)
                this.setState({
                    ...this.state,
                    fragmentAudios: res.data
                })
        })
        .catch(err => console.error(err))

    }


    displayAudios = () => {
        console.log('soy la array de audios',this.state.fragmentAudios)
        return(
        this.state.fragmentAudios ?
        
            this.state.fragmentAudios.map(audio => {
                console.log('soy un audio por favor muestrate',audio)
                return (
                    <Col>
                        <ReactAudioPlayer src={`${audio.audioFile}`} autoPlay={false} controls/>
                        <Link to={`/audios/${audio._id}`}>
                            <Button>Da tu opinion sobre este audio</Button>
                        </Link>
                    </Col>
                )
            }) : 
            <p>Cargando lista de audios...</p>
        )
    }


    render(){

        return (
            <>
            <Container>
                    {this.state.fragment && 
                <Row>
                    <Col>
                        <h3>{this.state.fragment.content}</h3>
                        <p>Este fragmento es del Libro: {this.state.book.name}</p>
                    </Col>
                </Row>
                    }
                <Row>
                        {this.displayAudios()}
                </Row>
            </Container>
            <Link to={`/libros`}>
                <Button>Volver</Button>
            </Link>
            </>
        )
    }
}

export default FragmentDetails