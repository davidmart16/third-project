import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function FragmentItem({ _id, content, bookId}) {

    return(
        <Card>
        
            <Card.Title>{content}</Card.Title>

            <Card.Body>
                <p>Pertenece al libro con id: {bookId}</p>
                <Link to={`/crear-audio/${_id}`}>
                <Button variant="primary">Subir audio de este fragmento</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default FragmentItem