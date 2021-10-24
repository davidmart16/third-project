import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import FragmentsService from '../../../../services/fragments.service'

const fragmentService = new FragmentsService()

function FragmentForm(props) {

    const [content, setContent] = useState('')
    const [bookId, setBookId] = useState('')

    useEffect(() => {
        const { bookId } = props.match.params;
        
        setBookId(bookId)
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()

        fragmentService.createFragment({bookId, content})
        .then(() => {
            //cambiar el redirect?
            props.history.push(`/libros`)
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