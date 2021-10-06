import { Button, Col, Container, Row } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import CommentList from "../../CommentsPage/CommentsList/CommentsList";
import { Link } from "react-router-dom";
import { Component } from "react";
import AudiosService from "../../../../services/audios.service";


class AudioDetails extends Component{
    constructor(props){
        super(props)

        this.state = {
            audio: null,
            rate: 0
        }

        this.audioService = new AudiosService()
    }
    
    componentDidMount(){
        const { id } = this.props.match.params

        this.audioService.getOneAudio( id )
        .then(res => {
            console.log('esto es el res que guardo en el estado de audiodetails',res)
            this.setState({
                ...this.state,
                audio: res.data.audio
            })

            this.getRateComments()

            console.log('esto es el audio en el estado', this.state.audio)
        })
        .catch(err => console.error(err))


    }


    getRateComments(){
        let rating = 0
        this.state.audio.comments.map(comment => rating += comment.rate)
        let rate = rating/this.state.audio?.comments?.length
        this.updateRateAudio(rate)
    }

    
    updateRateAudio(rate){
        console.log(rate, "EL RATE DEL SERVICIO")
        this.audioService.updateAudioRate(this.state.audio._id, rate)
        .then(res => {
            console.log('esto es el res del servicio de update hasta el rate', res.data.audio.rate)
            this.setState({
                ...this.state,
                rate: rate
            })
            console.log('esto es el rate en el estado', this.state.rate)
        })
        .catch(err => console.log(err))
    }
    


    render(){

        return(

        this.state.audio ? 

            <Container>
            <h3>Audio de {this.state.audio.book.name}</h3>
            <p>Del fragmento: {this.state.audio.fragment.content}</p>
                <Row>
                    <Col md={4}>
                        <ReactAudioPlayer src={`${this.state.audio.audioFile}`} autoPlay={false} controls/>
                    
                    </Col>
                    <Col md={8}>
                    {this.state.audio.comments.length > 0 ? 
                        <CommentList comments={this.state.audio.comments}></CommentList>
                    : <p>No hay comentarios aun</p>
                    }
                    </Col>
                </Row>
                <Link to={`/crear-comentario/${this.state.audio._id}`}>
                    <Button>Da tu opinion sobre este audio</Button>
                </Link>
                <Link to={`/audios`}>
                    <Button>Volver a la lista de audios</Button>
                </Link>
            </Container>

        : <p>cargando...</p>
        )
}
}

export default AudioDetails