import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AudiosService from "../../../../services/audios.service"
import AudioItem from "../AudioItem/AudioItem";
import './AudiosList.css'

const audioService = new AudiosService()

function AudioList (props) {
    
    const [audios, setAudios] = useState(null)
    
    useEffect(() => {
        audioService.getAudios()
        .then(res => {
            sortByRate(res.data)
        })
        .catch(err => console.log(err))
    }, [])


    const sortByRate = (audios) => {
        setAudios(audios.sort(((audio1, audio2) => audio2.rate - audio1.rate)))
    }
   

    const displayAudios = () => {
        
        return (
            audios ?
                audios.map((audio, idx) => {
                    return (
                        props ? 
                        <AudioItem {...audio} 
                        loggedUser={props?.loggedUser} 
                        storeUser={props?.storeUser}
                        key={`${idx}-${audio?._id}`} 
                        /> :
                        <AudioItem {...audio}
                        key={`${idx}-${audio?._id}`} 
                        />
                    )
                }) : 
                <p>Cargando...</p>
        )
    }

        return (
            <Container className='border'>
                <Row>
                    <Col md={12}><h2 className='list-title'>Los mejores audios</h2></Col>
                    {displayAudios()}
                </Row>
                {!props.loggedUser 
                && <h5 className='login'> Inicia sesion para poder comentar </h5>
                }
            </Container>
        )
      
}

export default AudioList