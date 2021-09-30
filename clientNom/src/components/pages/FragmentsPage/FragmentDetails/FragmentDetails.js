import { Col, Container, Row } from "react-bootstrap";
import AudiosService from "../../../../services/audios.service";
import ReactAudioPlayer from 'react-audio-player';
import BooksService from "../../../../services/books.service";
import FragmentsService from "../../../../services/fragments.service";
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
        console.log(id)
        this.fragmentService.getOneFragment(id)
        .then(res => {
            this.setState({
                ...this.state,
                fragment: res.data.fragment
            })
            console.log(res.data)
        })
        .catch(err => console.error(err))
        // this.state.fragment ?
        // this.bookService.getOneBook(this.state.fragment.bookId)
        // .then(res => {
        //     this.setState({
        //         ...this.state,
        //         book: res.data.book
        //     })
        // })
        // .catch(err => console.error(err))

        // : <p>waiting...</p>
        this.getAudios()

    }

    getAudios = () => {

        this.audioService.getAudiosByFragment(this.state.fragment?._id)
        .then(res => {
            console.log(res.data)
            this.setState({
                ...this.state,
                fragmentAudios: res.data.audios
            })
        })
        .catch(err => console.error(err))

    }

    displayAudios = () => {
        this.state.fragmentAudios ?
            this.state.fragmentAudios.map(audio => {
                return (
                    <Col>
                        <ReactAudioPlayer src={`${audio.audioFile}`} autoPlay controls/>
                    </Col>
                )
            }) : 
            <p>Cargando...</p>
    }


    render(){

        return (
            <>
            <Container>
                <Row>
                    {this.state.fragment && 
                    <Col>
                        <h3>{this.state.fragment.content}</h3>
                        <p>Este fragmento es de: {}</p>
                    </Col>
                    }
                </Row>
                <Row>hola
                        {this.displayAudios()}
                </Row>
            </Container>
            </>
        )
    }
}

export default FragmentDetails