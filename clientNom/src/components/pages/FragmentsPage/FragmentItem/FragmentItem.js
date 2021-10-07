import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './FragmentItem.css'

function FragmentItem({ _id, content, bookId}) {

    return(
        <Card className='fragment-item'>
        
            <Card.Title>{content}</Card.Title>

            <Card.Body>
                <p>Pertenece al libro con id: {bookId}</p>
                <Link to={`/crear-audio/${_id}`}>
                <Button variant="primary">Subir audio de este fragmento</Button>
                </Link>
                <Link to={`/fragmentos/${_id}`}>
                    <Button>Audios del Fragmento</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default FragmentItem