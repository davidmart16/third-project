import { Button, Col, Container, Row } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import CommentList from "../../CommentsPage/CommentsList/CommentsList";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AudiosService from "../../../../services/audios.service";
import {rateStar} from "../../../../utils";


const audioService = new AudiosService()

function AudioDetails() {
    const { id } = useParams()

    const [audio, setAudio] = useState(null)
    const [comments, setComments] = useState(null)
    const [rate, setRate] = useState(0)


    
    useEffect(() => {
        audioService.getOneAudio( id )
        .then(res => {
            setAudio(res.data.audio)
            return audioService.updateAudioRate(res.data.audio._id, rate)
        })
        .then(res => {
            const commentsValidated = res.data.audio.comments.filter(comment => comment.isValidated === true)
            setComments(commentsValidated)
            getRateComments(commentsValidated)
        })
        .catch(err => console.error(err))
    }, [rate])


    const getRateComments = (comments) => {
        let rating = 0
        comments.map(comment => rating += comment.rate)
        let rateAudio = rating/comments.length
        setRate(rateAudio)
    }


        return(

        audio ? 

            <Container>
            <h3>Audio de {audio.book.name}</h3>
            <p>Del fragmento: {audio.fragment.content}</p>
                <Row>
                    <Col md={4}>
                        <ReactAudioPlayer src={`${audio.audioFile}`} autoPlay={false} controls/>
                        <p>Valoracion del Audio: {rate ? rateStar(rate) : <p>Sin puntuacion</p>}</p>
                    
                    </Col>
                    <Col md={8}>
                    {comments?.length > 0 ? 
                        <CommentList comments={comments}></CommentList>
                    : <p>No hay comentarios aun</p>
                    }
                    </Col>
                </Row>
                <Link to={`/crear-comentario/${audio._id}`}>
                    <Button>Da tu opinion sobre este audio</Button>
                </Link>
                <Link to={`/audios`}>
                    <Button>Volver a la lista de audios</Button>
                </Link>
            </Container>

        : <p>Cargando...</p>
        )
}

export default AudioDetails