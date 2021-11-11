import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useHistory, useParams } from 'react-router'
import FragmentsService from '../../../../services/fragments.service'

const fragmentService = new FragmentsService()

function FragmentForm(props) {

    const [content, setContent] = useState('')
    const [bookId, setBookId] = useState('')
    const history = useHistory()
    console.log('soy un clg del useparams del form de fragment',useParams())
    const { bookIdParams } = useParams()

    useEffect(() => {
        setBookId(bookIdParams)
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()

        fragmentService.createFragment({bookId, content})
        .then(() => {
            //cambiar el redirect?
            history.push(`/libros`)
        })
        .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'content') setContent(value)
    }

        return(

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="content">
                    <Form.Label>Fragmento: </Form.Label>
                    <Form.Control onChange={(e) => handleChange(e)} 
                    name="content" 
                    value={content} 
                    type="text" 
                    placeholder="Introduce aqui el fragmento que vas a leer" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        )
}

export default FragmentForm