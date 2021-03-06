import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { cutFragments } from "../../../../utils";
import './FragmentItem.css'

function FragmentItem({ _id, content, bookName}) {

    const newContent = cutFragments(content)

    return(
        <>
        <Card className='fragment-item'>
            <Card.Title className='content'>{newContent}</Card.Title>
        </Card>
        <Link to={`/crear-audio/${_id}`}>
        <Button variant="primary">Subir audio de este fragmento</Button>
        </Link>
        <Link to={`/fragmentos/${_id}`}>
            <Button>Audios del Fragmento</Button>
        </Link>
        </>
    )
}

export default FragmentItem