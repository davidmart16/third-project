import { Component } from "react";
import APIBooksService from '../../../services/apibooks.service'



class PruebaBooks extends Component{
    constructor(){
        super()

        this.state={
            libros: null
        }

    }

    apibookService = new APIBooksService()


    componentDidMount(){
        this.apibookService.getBooksByType('teo')
        .then(res => {
            this.setState({
                ...this.state,
                libros: res.data
            })
            console.log(res.data)
        })
        .catch(err => console.error(err))
    }

    render(){

        return (
        <div>hola sara
            {this.state.libros ? 
            <div>{console.log(this.state.libros)}</div> :
            <p>cargando...</p>
            }
        </div>
        )
    }
}

export default PruebaBooks