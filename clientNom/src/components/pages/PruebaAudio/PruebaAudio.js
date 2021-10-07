import AudiosService from "../../../services/audios.service";
import ReactAudioPlayer from 'react-audio-player';
import { Component } from "react";

class PruebaAudio extends Component {
    constructor(){
        super()

        this.state= {
            audio: null
        }
    }

    audioService = new AudiosService()

    componentDidMount(){

        this.audioService.getOneAudio('6155851cb71dca2e8452f9ce')
        .then(res => {
            this.setState({
                ...this.state,
                audio: res.data.audio
            })
        })
    }

    render(){

        return(
            <>
            {this.state.audio ? 
            <ReactAudioPlayer src={`${this.state.audio.audioFile}`} autoPlay={false} controls/> : <p>cargando</p>
            }
            </>
        )
    }
}

export default PruebaAudio