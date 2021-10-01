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

    componentDidMount(){
        const { id } = this.props.match.params
        const info = {fragment: null}

        this.fragmentService.getOneFragment(id)
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
            this.getAudios()
            
        }
        //FILTRAR AUDIOS AQUI O LLAMAR MEJOR EN EL SERVICIO
        getAudios = () => {
            
            this.audioService.getAudiosByFragment(this.state.fragment?._id)
            .then(res => {
                this.setState({
                    ...this.state,
                    fragmentAudios: res.data
                })
        })
        .catch(err => console.error(err))

    }

    displayAudios = () => {
        return(
        this.state.fragmentAudios ?
            this.state.fragmentAudios.map(audio => {
                console.log(audio)
                return (
                    <Col>
                        <ReactAudioPlayer src={`${audio.audioFile}`} autoPlay={false} controls/>
                        <Link to={`/audios/${audio._id}`}>
                            <Button>Da tu opinion sobre este audio</Button>
                        </Link>
                    </Col>
                )
            }) : 
            <p>Cargando...</p>
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
                        <p>Este fragmento es de: {this.state.book.name}</p>
                    </Col>
                </Row>
                    }
                <Row>
                        {this.displayAudios()}
                </Row>
            </Container>
            </>
        )
    }
}

export default FragmentDetails