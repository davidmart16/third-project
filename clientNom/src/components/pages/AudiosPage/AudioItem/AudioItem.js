import { Button, Col } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import { Link } from "react-router-dom";

function AudioItem ({audioFile, _id}, props) {

    return(
        
            <Col md={6}>
                <ReactAudioPlayer src={`${audioFile}`} autoPlay={false} controls/>
                {/* {props.loggedUser &&  */}
                <Link to={`/audios/${_id}`}>
                    <Button >Detalles</Button>
                </Link>
                {/* } */}
            </Col>
    )
}

export default AudioItem