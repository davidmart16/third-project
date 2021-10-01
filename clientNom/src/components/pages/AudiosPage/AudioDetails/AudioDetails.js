import { Col, Row } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import CommentList from "../../CommentsPage/CommentsList/CommentsList";

function AudioDetails ({audioFile, comments}) {

    return(
        <Row>
            <Col md={4}>
                <ReactAudioPlayer src={`${audioFile}`} autoPlay={false} controls/>
            </Col>
            <Col md={8}>
                <CommentList comments={comments}></CommentList>
            </Col>
        </Row>
    )
}

export default AudioDetails