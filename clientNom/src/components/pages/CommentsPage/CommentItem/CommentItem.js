import { Col } from "react-bootstrap";

function CommentItem ({text, _id}) {

    return(
        
            <Col>
                <article>{text}</article>
            </Col>
    )
}

export default CommentItem