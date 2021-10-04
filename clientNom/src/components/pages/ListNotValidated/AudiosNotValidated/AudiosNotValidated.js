import ReactAudioPlayer from 'react-audio-player';
import { Button, Col, Form, Row } from "react-bootstrap"
import { Link } from 'react-router-dom';
import AudiosService from '../../../../services/audios.service';




function AudiosNotValidated(props) {

    const audioService = new AudiosService()
    // constructor(props){
    //     super()

    //     this.state={
    //         audios: null
    //     }
    // }


    // componentDidMount(){

    //     this.setState({
    //         ...this.state,
    //         audios: this.props.audios
    //     })
    // }


    // componentDidUpdate = (prevProps, prevState) => {

    //     console.log('prevprops de los audios -',prevProps.audios?.length)
    //     // if (prevProps.audios.length !== this.props.audios.length) this.getNotValidated()
    // }
    const displayAudios = () => {

        return (
            props.audios ?
                props.audios.map(audio => {

                    return(
                        <Col md={3}>
                            <ReactAudioPlayer src={`${audio.audioFile}`} autoPlay={false} controls/>
                            <Form onSubmit>
                                <Button type="submit">Validar</Button>
                            </Form>
                        </Col>
                    )
                })
            : <p>cargando audios...</p>
        )
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()

    //     audioService.updateAudio(audio._id)
    //     .then(()=> {
    //         console.log(props)
    //         // this.props.history.push(`/perfil`)
    //     })
    // }


        return(
            <Row>
            <h3>Lista de audios a validar</h3>
                <hr/>
            {displayAudios()}
            </Row>
            )
}

export default AudiosNotValidated