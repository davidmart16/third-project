import { Col } from "react-bootstrap";
import rateStar from "../../../../utils";
import './CommentItem.css'

function CommentItem ({text, rate, _id}) {

    return(
        
            <Col className='comment-item'>
                <article>{text}</article>
                <>{rate ? rateStar(rate) : <p>Sin puntuacion</p>}</>
            </Col>
    )
}

export default CommentItem