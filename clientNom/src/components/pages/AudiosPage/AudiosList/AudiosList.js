import { Component } from "react";
import { Col } from "react-bootstrap";
import AudiosService from "../../../../services/audios.service"
//import ReactAudioPlayer from 'react-audio-player';


class AudioList extends Component {
    constructor(){
        super();

        this.state= {
            audios: null
        }
        this.audioService = new AudiosService()
    }


    componentDidMount(){
        this.audioService.getAudios()
        .then(res => {
            this.setState({
                ...this.state,
                audios: res.data
            })
        })
    }

    displayAudios = () => {

        return (

            this.state.audios ?
             this.state.audios.map(audio => {

                    return (
                        <Col>
                            <div>{audio.audioFile}</div>
                            {/* <ReactAudioPlayer src={`${audio.audioFile}`} autoPlay controls/> */}
                        </Col>
                    )
                }) : 
                <p>Cargando...</p>
        )
    }


    render() {

        return (
            
            <div>
                hola buenas vengo de la rama de dani&jesus y somos audios
                {this.displayAudios()}
            </div>
        )
    }   
}

export default AudioList