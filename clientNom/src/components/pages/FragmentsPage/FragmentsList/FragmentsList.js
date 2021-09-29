import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
import FragmentsService from "../../../../services/fragments.service"
import FragmentItem from "../FragmentItem/FragmentItem";


class FragmentsList extends Component {
    constructor(){
        super();

        this.state= {
            fragments: null
        }
        this.fragmentService = new FragmentsService()
    }

    componentDidMount(){
        this.fragmentService.getFragments()
        .then(res => {
            console.log(res.data)
            this.setState({
                ...this.state,
                fragments: res.data
            })
        })
    }
        displayFragment = () => {
        return(
            this.state.fragments ?
                this.state.fragments.map(fragment => {
                    return (
                        <Col md={4}>
                                <FragmentItem/>
                            </Col>
                    )
                }) : 
                <p>Cargando...</p>
        )

    }

    render() {

        return (
            <>
                <h2>Listado de Libros</h2>
                <hr/>
                <Container>
                    <Row>
                        {this.displayFragment()}
                    </Row>
                </Container>
            </>
        )
    }   
}

export default FragmentsList