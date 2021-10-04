import { Component } from "react"
import ReactAudioPlayer from 'react-audio-player';
import { Button, Col, Row } from "react-bootstrap"
import { Link } from 'react-router-dom';




class AudiosNotValidated extends Component{
    constructor(props){
        super()

        this.state={
            audios: null
        }
    }


    componentDidMount(){

        this.setState({
            ...this.state,
            audios: this.props.audios
        })
    }


    componentDidUpdate = (prevProps, prevState) => {

        console.log('prevprops de los audios -',prevProps.audios?.length)
        // if (prevProps.audios.length !== this.props.audios.length) this.getNotValidated()
    }
    displayAudios() {

        return (
            this.state.audios ?
                this.state.audios.map(audio => {

                    return(
                        <Col md={3}>
                            <ReactAudioPlayer src={`${audio.audioFile}`} autoPlay={false} controls/>
                            <Link>
                                <Button>boton de Prueba</Button>
                            </Link>
                        </Col>
                    )
                })
            : <p>cargando audios...</p>
        )
    }

    render(){


        return(
            <Row>
            <h3>Lista de audios a validar</h3>
                <hr/>
            {this.displayAudios()}
            </Row>
            )
    }
}

export default AudiosNotValidated