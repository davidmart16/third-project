import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import CommentItem from "../CommentItem/CommentItem";

function CommentList(props) {

    const [comments, setComments] = useState(null)

    useEffect(() => {
        setComments(props.comments)
    }, [])


    const displayComments = () => {

        return (
        comments ?
             comments.map((comment, idx) => <CommentItem key={`${comment._id}--${idx}`} {...comment}/>) 
             : <p>Cargando...</p>
        )
    }
    
        
        return(
            <Container>
                <Row>
                    {displayComments()}
                </Row>
            </Container>
        )
}

export default CommentList