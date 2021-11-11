import { useParams } from "react-router";
import { Button, Col, Container, Row } from "react-bootstrap";
import AudiosService from "../../../../services/audios.service";
import ReactAudioPlayer from 'react-audio-player';
import BooksService from "../../../../services/books.service";
import FragmentsService from "../../../../services/fragments.service";
import { Link } from "react-router-dom";
import './FragmentDetails.css'

const { useState, useEffect } = require("react");

const fragmentService = new FragmentsService();
const bookService = new BooksService()
const audioService = new AudiosService()

function FragmentDetails () {
    
    const { id } = useParams()
    const [fragment, setFragment] = useState(null)
    const [book, setBook] = useState(null)
    const [fragmentAudios, setFragmentAudios] = useState(null)

    useEffect(() => {
        getFragmentAndBook()
    }, [])


    const getFragmentAndBook = () => {

        fragmentService.getOneFragment(id)
        .then(res => {
            setFragment(res.data.fragment)
            getAudios(res.data.fragment)
            return bookService.getOneBook(res.data.fragment.bookId)
        })
        .then(res => {
            setBook(res.data.book)
        })
        .catch(err => console.error(err))

    }


    const getAudios = (fragment) => {
        audioService.getAudiosByFragment(fragment._id)
        .then(res => setFragmentAudios(res.data))
    .catch(err => console.error(err))

    }


    const displayAudios = () => {
        return(
        fragmentAudios ?
        
            fragmentAudios.map((audio, idx) => {
                return (
                    <Col key={`${idx}-${audio._id}`}>
                        <ReactAudioPlayer src={`${audio.audioFile}`} autoPlay={false} controls/>
                        <Link to={`/audios/${audio._id}`}>
                            <Button>Comentarios del audio</Button>
                        </Link>
                    </Col>
                ) 
            }) : 
            <p>Cargando lista de audios...</p>
        )
    }



        return (
            <>
            <Container>
                    {fragment && 
                <Row>
                    <Col>
                        <h3 className='fragment-content'>{fragment.content}</h3>
                        <p className='fragment-content-p'>Este fragmento es del Libro: {book?.name}</p>
                    </Col>
                </Row>
                    }
                <Row>
                        {displayAudios()}
                </Row>
            <Link to={`/libros/${fragment?.bookId}`}>
                <Button>Volver a libros</Button>
            </Link>    
            <Link to={`/crear-audio/${fragment?._id}`}>
                <Button>Subir audio de este fragmento</Button>
            </Link>
            </Container>
            </>
        )
}

export default FragmentDetails