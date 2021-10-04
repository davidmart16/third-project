import { Button, Col, Row } from "react-bootstrap"
import { Link } from 'react-router-dom';



function FragmentsNotValidated(props) {
    // constructor(props){
    //     super(props)

    //     // this.state={
    //     //     fragments: null
    //     // }
    // }

    // componentDidMount(){
    //     this.setState({
    //         ...this.state,
    //         fragments: this.props.fragments
    //     })
    // }

    // componentDidUpdate = (prevProps, prevState) => {

    //     console.log('prevprops de los fragmentos',prevProps.fragments?.length)
    //     // if (prevProps.fragments.length !== this.props.fragments.length) this.getNotValidated()
    // }

    const displayFragments = () => {

        return (
            props.fragments ?
                props.fragments.map(fragment => {

                    return(
                        <Col md={4}>
                            <p>-{fragment.content}-</p>
                            <Link>
                                <Button>boton de prueba</Button>
                            </Link>
                        </Col>
                    )
                })
            : <p>cargando fragmentos...</p>
        )
    }


    return(
        <Row>
            <h3>Lista de Fragmentos a validar</h3>
            <hr/>
            {displayFragments()}
        </Row>
        )
}

export default FragmentsNotValidated