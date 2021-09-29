import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function FragmentItem({_id, content, bookId}) {

    return(
        <Col md={4} className="mb-3">
            <Card>
            
                <Card.Title>{content}</Card.Title>

                <Card.Body>

                    <Link to={`/fragmentos/${_id}`}>
                    <Button variant="primary">Ver detalles</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default FragmentItem