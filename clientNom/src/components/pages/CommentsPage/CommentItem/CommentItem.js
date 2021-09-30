import { Col } from "react-bootstrap";

function CommentItem ({text, _id}) {

    return(
        
            <Col md={6}>
                <article>{text}</article>
            </Col>
    )
}

export default CommentItem