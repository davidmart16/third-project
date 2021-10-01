import { Component } from "react"
import { Button, Form } from "react-bootstrap"
import CommentsService from "../../../../services/comments.service"

class CommentForm extends Component{
    constructor(props){
        super(props)

        this.state={
            text: '',
            userId: '',
            audioId: ''
        }
    }

    commentService = new CommentsService()

    componentDidMount = () => {
        const userId = this.props.loggedUser._id
        //pasar el usuario registrado
        console.log(this.props.loggedUser)
        const { audioId } = this.props.match.params; //esto esta mal
        
        this.setState({
            ...this.state,
            audioId: audioId,
            userId: userId
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.commentService.createComment({text: this.state.text, user: this.state.userId, audioId: this.state.audioId})
        .then(()=> {
            this.props.history.push(`/audios/${this.state.audioId}`)
        })
        .catch(err => console.error(err))
        
    }

    handleChange = (e) => {

    const { name, value } = e.target;
        this.setState({
          ...this.state,
        [name]: value
        })
    }


    render() {

        return(

            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="text">
                    <Form.Label>Comentario: </Form.Label>
                    <Form.Control onChange={(e) => this.handleChange(e)} name="text" value={this.state.text} type="text" placeholder="Comenta" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        )
    }   
}

export default CommentForm