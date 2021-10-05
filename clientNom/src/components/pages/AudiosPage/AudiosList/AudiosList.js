import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AudiosService from "../../../../services/audios.service"
import AudioItem from "../AudioItem/AudioItem";


class AudioList extends Component {
    constructor(props){
        super(props);
        
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
                        <AudioItem fav {...audio} loggedUser={this.props.loggedUser} storeUser={this.props.storeUser}></AudioItem>
                    )
                }) : 
                <p>Cargando...</p>
        )
    }


    render() {

        return (
            <Container>
                <Row>
                    <Col md={12}><h2>Los mejores audios</h2></Col>
                <hr/>
                    {this.displayAudios()}
                </Row>
                <hr/>
                {!this.props.loggedUser 
                && <h5> Inicia sesion para poder comentar </h5>
                }
            </Container>
        )
    }   
}

export default AudioList