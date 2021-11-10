import ReactAudioPlayer from 'react-audio-player';
import { Button, Col, Form, Row } from "react-bootstrap"
import AudiosService from '../../../../services/audios.service';
import './AudiosNotValidated.css'




function AudiosNotValidated(props) {

    const audioService = new AudiosService()
    

    const displayAudios = () => {

        return (
            props.audios ?
                props.audios.map((audio, idx) => {

                    return(
                        <Col className='' key={audio._id + idx} lg={4} md={6}>
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
            <Row className='center'>
            <h3>Lista de audios a validar</h3>
            {displayAudios()}
            </Row>
            )
}

export default AudiosNotValidated