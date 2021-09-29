import { Component } from "react"
import { Button, Form } from "react-bootstrap"
import FragmentsService from '../../../../services/fragments.service'

class FragmentForm extends Component{
    constructor(props){
        super(props)

        this.state={
            content: '',
            bookId: ''
        }
    }

    fragmentService = new FragmentsService()

    componentDidMount = () => {
        const { bookId } = this.props.match.params;
        
        this.setState({
            ...this.state,
            bookId: bookId
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.fragmentService.createFragment(this.state)
        .then(()=> {
            // this.props.reloadFragments()
            this.props.history.push(`/libros/${this.state.bookId}`)
        })
    }

    handleChange = (e) => {

    const { name, value } = e.target;
        this.setState({
          ...this.state,
        [name]: value
        })
    }


    render() {

        return(

            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="content">
                    <Form.Label>Fragmento: </Form.Label>
                    <Form.Control onChange={(e) => this.handleChange(e)} name="content" value={this.state.content} type="text" placeholder="Introduce aqui el fragmento que vas a leer" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        )
    }   
}

export default FragmentForm