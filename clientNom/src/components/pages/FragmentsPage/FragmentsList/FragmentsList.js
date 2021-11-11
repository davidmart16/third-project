import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FragmentsService from "../../../../services/fragments.service"
import FragmentItem from "../FragmentItem/FragmentItem";
import './FragmentsList.css'

const fragmentService = new FragmentsService()

function FragmentsList ( {book} ) {

    const [fragments, setFragments] = useState(null)

    useEffect(() => {

        fragmentService.getFragments()
        .then(res => {
            setFragments(res.data)
            filteredFragments(res.data, book._id)
        })
        .catch(err => console.log(err))
    }, [])



    const displayFragments = () => {
        return(
            fragments ?
                fragments.map((fragment, idx) => {
                    return (
                        <Col key={`${idx}-${fragment?._id}`} md={6}>
                            <FragmentItem {...fragment} bookName={book.name}/>
                        </Col>
                    )
                }) : 
                <p>Cargando...</p>
        )
    }

    const filteredFragments = (fragments, book) => {
        const copyFragments = [...fragments]
        setFragments(copyFragments.filter(fragment => fragment.bookId.includes(book)))
    }


        return (
            <>
                <h2 className='title-fragments'>Fragmentos del libro "{book.name}"</h2>
                <Container className='list-fragments'>
                    <Row>
                        {displayFragments()}
                    </Row>
                </Container>
            </>
        )
}

export default FragmentsList