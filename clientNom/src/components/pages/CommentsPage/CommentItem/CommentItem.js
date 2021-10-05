import { Col } from "react-bootstrap";

function CommentItem ({text, rate, _id}) {

    return(
        
            <Col>
                <article>{text}</article>
                <>{rate ? rate : <p>Sin puntuacion</p>}</>
            </Col>
    )
}

export default CommentItem