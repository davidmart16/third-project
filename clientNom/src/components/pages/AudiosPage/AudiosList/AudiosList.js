import { Component } from "react";
import { Container, Row } from "react-bootstrap";
import AudiosService from "../../../../services/audios.service"
import AudioItem from "../AudioItem/AudioItem";


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
                        <AudioItem {...audio} ></AudioItem>
                    )
                }) : 
                <p>Cargando...</p>
        )
    }


    render() {

        return (
            <Container>
                <Row>
                    <h2>Los mejores audios</h2>
                    {this.displayAudios()}
                </Row>
            </Container>
        )
    }   
}

export default AudioList