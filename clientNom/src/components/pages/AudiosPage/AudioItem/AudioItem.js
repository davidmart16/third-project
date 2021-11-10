import { Button, Col } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import { Link } from "react-router-dom";
import UsersService from "../../../../services/users.service";
import { rateStar } from "../../../../utils";
import './AudioItem.css'

const userService = new UsersService()

function AudioItem ({rate, audioFile, _id , loggedUser, storeUser }) {

    
    const checkInclude = (audioId, arrAudios) => arrAudios.includes(audioId)
    let audioInclude
    loggedUser ? audioInclude = checkInclude(_id, loggedUser ? loggedUser.favAudios : []) : audioInclude = null

    const handleClick = (e) => {
        e.preventDefault()
        const info = {
            audioId: _id,
            userId: loggedUser._id
        }
        
        userService.addAudiosFav(info.audioId, info.userId)
        .then((res) => {
            storeUser(res.data.user)
        })
        .catch(err => console.log(err))

        audioInclude = checkInclude(_id, loggedUser.favAudios)

    }
    
    
    return(
        
            <Col md={6}>
                <ReactAudioPlayer src={`${audioFile}`} autoPlay={false} controls/>
                <>{rate ? rateStar(rate) : <div className='rating'>☆☆☆☆☆</div>}</>
                {loggedUser && 
                <>
                <Link to={`/audios/${_id}`}>
                    <Button >Detalles</Button>
                </Link>
                
                <form onSubmit={handleClick}>
                    <Button type="submit">{audioInclude ? 'Eliminar de Fav' : 'Añadir a favoritos'}</Button>
                </form>
                </>
                }
            </Col>
    )
}

export default AudioItem