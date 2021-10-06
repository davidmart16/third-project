import { Col } from "react-bootstrap";
import rateStar from "../../../../utils";

function CommentItem ({text, rate, _id}) {

    return(
        
            <Col>
                <article>{text}</article>
                <>{rate ? rateStar(rate) : <p>Sin puntuacion</p>}</>
            </Col>
    )
}

export default CommentItem