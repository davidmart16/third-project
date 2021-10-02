import { Button, Col } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import { Link } from "react-router-dom";

function AudioItem ({audioFile, _id , loggedUser}) {
    console.log(audioFile, _id, loggedUser)

    return(
        
            <Col md={6}>
                <ReactAudioPlayer src={`${audioFile}`} autoPlay={false} controls/>
                {loggedUser && 
                <Link to={`/audios/${_id}`}>
                    <Button >Detalles</Button>
                </Link>
                }
            </Col>
    )
}

export default AudioItem