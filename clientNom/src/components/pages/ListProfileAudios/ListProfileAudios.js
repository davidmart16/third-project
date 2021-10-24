import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Button, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import UsersService from "../../../services/users.service";
// import AudioItem from "../AudiosPage/AudioItem/AudioItem";


const userService = new UsersService()


function ListProfileAudios(props) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser()
    }, [])


    const getUser = () => {
        userService.getOneUser(props.loggedUser._id)
        .then(res => {
            setUser(res.data.user)
        })
        .catch(err => console.log(err)) 

    }


    const displayMyAudios = () => {
        return (
            user ? 
            user.myAudios.map((audio, idx) =>  {
                return(
                    
                    <Col key={`${audio._id}-${idx}`} md={6}>
                        <ReactAudioPlayer src={`${audio.audioFile}`} autoPlay={false} controls/>
                        {props.loggedUser && 
                        <Link to={`/audios/${audio._id}`}>
                            <Button >Detalles</Button>
                        </Link>
                        }
                    </Col>
                )
        })
            : <p>Cargando usuario</p>
        )
    }


    const displayFavAudios = () => {
        return (
            user ? 
            user.favAudios.map(audio =>  {
                return(

                    <Col md={6}>
                        <ReactAudioPlayer src={`${audio.audioFile}`} autoPlay={false} controls/>
                        <Link to={`/audios/${audio._id}`}>
                            <Button >Detalles</Button>
                        </Link>
                    </Col>
                        // <AudioItem {...audio} loggedUser={this.props.loggedUser}/> 
                )
        })
            : <p>Cargando usuario</p>
        )
    }
    
    return(
        <>
        <Row>
            <h3>Lista de mis audios</h3>
            <hr/>
            {user ?
                displayMyAudios()
                : <p>Cargando audios...</p>
            } 
        </Row>
        <Row>
            <h3>Lista de mis audios favoritos</h3>
            <hr/>
            {user ?
                displayFavAudios()
                : <p>Cargando audios...</p>
            } 
        </Row>
        </>
    )
}

export default ListProfileAudios