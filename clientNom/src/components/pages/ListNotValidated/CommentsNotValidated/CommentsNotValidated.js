import { Component } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { Link } from 'react-router-dom';



class CommentsNotValidated extends Component{
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

    componentDidUpdate = (prevProps, prevState) => {

        console.log('prevprops de los comentarios ',prevProps.comments?.length)
        // if (prevProps.comments.length !== this.props.comments.length) this.getNotValidated()
    }

    displayComments() {

        return (
            this.state.comments ?
                this.state.comments.map(comment => {

                    return(
                        <Col md={3}>
                            <p>-{comment.text}-</p>
                            <Link>
                                <Button>Boton de prueba</Button>
                            </Link>
                        </Col>
                    )
                })
            : <p>cargando comentarios...</p>
        )
    }


    render(){


        return(
            <Row>
            <h3>Lista de comentarios a validar</h3>
            <hr/>
            {this.displayComments()}
            </Row>
            )
    }
}


export default CommentsNotValidated