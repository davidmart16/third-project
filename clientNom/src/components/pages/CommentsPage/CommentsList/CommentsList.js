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
             comments.map(comment => <CommentItem {...comment}/>) 
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