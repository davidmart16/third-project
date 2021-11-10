import { Button, Col, Form, Row } from "react-bootstrap"
import FragmentsService from "../../../../services/fragments.service";



function FragmentsNotValidated(props) {

    const fragmentService = new FragmentsService()


    const handleSubmit = (e) => {
        e.preventDefault()

        const fragmentId = e.target.querySelector('button').value

        fragmentService.updateFragment(fragmentId)
        .then(()=> {
            props.getNotValidated()
        })
        .catch(err => console.log(err))
    }


    const displayFragments = () => {

        return (
            props.fragments ?
                props.fragments.map((fragment, idx) => {

                    return(
                        <Col key={`${idx}-${fragment._id}`} className='validated-items' lg={4} md={6}>
                            <p>-{fragment.content}-</p>
                            <Form onSubmit={handleSubmit}>
                                <Button type="submit" value={fragment._id}>Validar</Button>
                            </Form>
                        </Col>
                    )
                })
            : <p>cargando fragmentos...</p>
        )
    }


    return(
        <Row>
            <h3>Lista de Fragmentos a validar</h3>
            {displayFragments()}
        </Row>
        )
}

export default FragmentsNotValidated