  
import React, { Component } from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom";


class SearchBar extends Component {
    constructor(props){
        super()

        this.state={
            searchValue: '',
        }

    }

    handleChange = (e) => {
        const { value } = e.target

        this.setState({
            ...this.state,
            searchValue: value
        })
        console.log(this.state.searchValue)
    }

    render() {

        return(
            
        <Container>

                <InputGroup className="mb-3 mt-4">
                    <FormControl onChange={e => this.handleChange(e)} name="searchValue" value={this.state.searchValue} 
                    placeholder="Search for title..." aria-label="buscar"/>
                <Link to={`/lista-libros/${this.state.searchValue}`}>
                <Button variant="primary" type="submit">Buscar</Button>
                </Link>
                </InputGroup>

        </Container>

        )
    }
}

export default SearchBar