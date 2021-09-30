import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
import FragmentsService from "../../../../services/fragments.service"
import FragmentItem from "../FragmentItem/FragmentItem";


class FragmentsList extends Component {
    constructor(props){
        super(props);

        this.state= {
            fragments: null
        }
        this.fragmentService = new FragmentsService()
    }

    componentDidMount(){
        console.log(this.props.book._id)
        this.fragmentService.getFragments()
        .then(res => {
            this.setState({
                ...this.state,
                fragments: res.data
            })
            this.filteredFragments(this.props.book._id)
        })
    }

        displayFragments = () => {
        return(
            this.state.fragments ?
                this.state.fragments.map(fragment => {
                    return (
                        <Col md={6}>
                            <FragmentItem {...fragment} bookName= {this.props.book.name}/>
                        </Col>
                    )
                }) : 
                <p>Cargando...</p>
        )

    }

    filteredFragments = (book) => {
        const copyFragments = this.state.fragments
        return(
            copyFragments ?
            this.setState({
                ...this.state,
                fragments: copyFragments.filter(fragment => fragment.bookId.includes(book))
            }) :
            <p>Cargando</p>
        )
    }


    render() {

        return (
            <>
                <h2>Fragmentos</h2>
                <hr/>
                <Container>
                    <Row>
                        {this.displayFragments()}
                         
                    </Row>
                </Container>
            </>
        )
    }   
}

export default FragmentsList