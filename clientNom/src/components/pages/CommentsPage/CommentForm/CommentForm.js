import { Component } from "react"
import { Button, Form } from "react-bootstrap"
import CommentsService from "../../../../services/comments.service"

class CommentForm extends Component{
    constructor(props){
        super(props)

        this.state={
            text: '',
            user: ''
        }
    }

    commentService = new CommentsService()

    componentDidMount = () => {
        const { user } = this.props.match.params;
        
        this.setState({
            ...this.state,
            user: user
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.commentService.createComment(this.state)
        .then(()=> {
            // this.props.reloadFragments()
            this.props.history.push(`/libros/${this.state.bookId}`)
        })
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
                <Form.Group className="mb-3" controlId="content">
                    <Form.Label>Fragmento: </Form.Label>
                    <Form.Control onChange={(e) => this.handleChange(e)} name="content" value={this.state.content} type="text" placeholder="Introduce aqui el fragmento que vas a leer" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        )
    }   
}

export default CommentForm