  
import React, { useState } from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom";
import './SeachBar.css'


function SearchBar () {

    const [searchValue, setSearchValue] = useState('')

    const handleChange = (e) => {
        const { value } = e.target
        setSearchValue(value)
    }

        return(
            
        <Container>

                <InputGroup className="mb-3 mt-4">
                    <FormControl onChange={e => handleChange(e)} name="searchValue" value={searchValue} 
                    placeholder="Search for title..." aria-label="buscar"/>
                <Link to={`/lista-libros/${searchValue}`}>
                <Button variant="primary" type="submit">Buscar</Button>
                </Link>
                </InputGroup>

        </Container>

        )
}

export default SearchBar