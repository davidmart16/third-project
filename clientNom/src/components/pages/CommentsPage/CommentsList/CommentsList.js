import { Component } from "react";
import { Row } from "react-bootstrap";
import CommentItem from "../CommentItem/CommentItem";

class CommentList extends Component {
    constructor(props){
        super()
        
        this.state={
            comments: null
        }

    }

    componentDidMount(){
        console.log('hola soy las props',this.props)
        this.setState({
            ...this.state,
            comments: this.props
        })
    }

    displayComments = () => {
        console.log(this.state.comments)
        return (
        this.state.comments ?
             this.state.comments.map(comment => {
                return(
                    
                    <CommentItem {...comment}/>
                    )

            })
            : <div>fallando</div>
        )
    }
    
    
    render(){
        
        return(
            
            <Row>
            <div>hola a ti si a ti</div>
                {this.displayComments()}
            </Row>
        )
    }
}

export default CommentList