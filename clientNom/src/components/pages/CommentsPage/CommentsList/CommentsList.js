import { Component } from "react";
import { Container, Row } from "react-bootstrap";
import CommentItem from "../CommentItem/CommentItem";

class CommentList extends Component {
    constructor(props){
        super()
        
        this.state={
            comments: null
        }

    }

    componentDidMount(){

        this.setState({
            ...this.state,
            comments: this.props.comments
        })
    }

    displayComments = () => {

        return (
        this.state.comments ?
             this.state.comments.map(comment => <CommentItem {...comment}/>) 
             : <div>fallando</div>
        )
    }
    
    
    render(){
        
        return(
            <Container>
                <Row>
                    {this.displayComments()}
                </Row>
            </Container>
        )
    }
}

export default CommentList