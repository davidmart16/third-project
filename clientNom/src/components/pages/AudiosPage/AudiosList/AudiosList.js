import { Component } from "react";
import AudiosService from "../../../../services/audios.service"


class AudioList extends Component {
    constructor(){
        super();

        this.state= {
            audios: null
        }
        this.audioService = new AudiosService()
    }


    render() {

        return (
            
            <div>
            hola buenas vengo de la rama de dani&jesus y somos audios
        </div>
        )
    }   
}

export default AudioList