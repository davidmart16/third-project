import { Component } from "react"
import { Button, Form } from "react-bootstrap"
import CommentsService from "../../../../services/comments.service"
import { FaStar } from "react-icons/fa"
import './CommentForm.css'

class CommentForm extends Component{
    constructor(props){
        super(props)

        this.state={
            text: '',
            userId: '',
            audioId: '',
            rate: null,
            hover: null
        }
    }

    commentService = new CommentsService()

    componentDidMount = () => {
        const userId = this.props.loggedUser._id

        const { audioId } = this.props.match.params;
        
        this.setState({
            ...this.state,
            audioId: audioId,
            userId: userId
        })
    }


    handleSubmit = (e) => {
        e.preventDefault()

        this.commentService.createComment({text: this.state.text, user: this.state.userId, audioId: this.state.audioId, rate: this.state.rate})
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
            <h2>Valora el audio </h2>
          {[...Array(5)].map((star, idx) => {
            const rateValue = idx + 1;

            return (
              <label key={idx}>
                <input
                  id="starRadio"
                  type="radio"
                  name="rate"
                  value={rateValue}
                  onClick={(e) => this.handleChange(e)}
                />
                <FaStar
                  className="star"
                  color={
                    rateValue <= (this.state.hover || this.state.rate) ? "#ffc107" : "#e4e5e9"
                  }
                  size={30}
                  onMouseEnter={() => 
                  this.setState({
                      ...this.state,
                      rate: rateValue})
                    }
                  onMouseLeave={() => this.setState({
                      ...this.state,
                      hover: null})}
                />
              </label>
            );
          })}
                <Form.Group className="mb-3" controlId="text">
                
                    <Form.Label><h4>Comentario: </h4></Form.Label>
                    <p> Hola  </p>
                    <Form.Control onChange={(e) => this.handleChange(e)} name="text" value={this.state.text} type="text" placeholder="Deja tu comentario" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        )
    }   
}

export default CommentForm