import ReactAudioPlayer from 'react-audio-player';
import { Button, Col, Form, Row } from "react-bootstrap"
import AudiosService from '../../../../services/audios.service';




function AudiosNotValidated(props) {

    const audioService = new AudiosService()
    

    const displayAudios = () => {

        return (
            props.audios ?
                props.audios.map((audio, idx) => {

                    return(
                        <Col key={audio._id + idx} md={3}>
                            <ReactAudioPlayer src={`${audio.audioFile}`} autoPlay={false} controls/>
                            <Form onSubmit={handleSubmit}>
                                <Button type="submit" value={audio._id}>Validar</Button>
                            </Form>
                        </Col>
                    )
                })
            : <p>cargando audios...</p>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const audioId = e.target.querySelector('button').value
        audioService.updateAudio(audioId)
        .then(()=> {
            props.getNotValidated()
        })
        .catch(err => console.log(err))
    }


        return(
            <Row>
            <h3>Lista de audios a validar</h3>
                <hr/>
            {displayAudios()}
            </Row>
            )
}

export default AudiosNotValidated