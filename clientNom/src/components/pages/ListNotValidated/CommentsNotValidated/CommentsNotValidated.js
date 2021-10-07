import { Button, Col, Form, Row } from "react-bootstrap"
import CommentsService from "../../../../services/comments.service";



function CommentsNotValidated (props){


    const commentService = new CommentsService()


    const handleSubmit = (e) => {
        e.preventDefault()

        const commentId = e.target.querySelector('button').value

        commentService.updateComment(commentId)
        .then(()=> {
            props.getNotValidated()
        })
        .catch(err => console.log(err))
    }

    const displayComments = () => {

        return (
            props.comments ?
                props.comments.map(comment => {

                    return(
                        <Col md={3}>
                            <p>-{comment.text}-</p>
                            <Form onSubmit={handleSubmit}>
                                <Button type="submit" value={comment._id}>Validar</Button>
                            </Form>
                        </Col>
                    )
                })
            : <p>cargando comentarios...</p>
        )
    }


    return(
        <Row>
        <h3>Lista de comentarios a validar</h3>
        <hr/>
        {displayComments()}
        </Row>
        )
    
}


export default CommentsNotValidated