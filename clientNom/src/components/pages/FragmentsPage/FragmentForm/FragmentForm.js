import { Component } from "react"
import { Form } from "react-bootstrap"
import FragmentsService from '../../../../services/fragments.service'

class FragmentForm extends Component{
    constructor(){
        super()

        this.state={
            fragment: null
        }
    }

    fragmentService = new FragmentsService()

    handleSubmit = () => {

    }



    render() {

        return(

            <Form onSubmit={this.handleSubmit}>

            </Form>
        )
    }   
}

export default FragmentForm