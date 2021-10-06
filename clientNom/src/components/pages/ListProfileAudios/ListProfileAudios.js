import { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Button, Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import UsersService from "../../../services/users.service";
// import AudioItem from "../AudiosPage/AudioItem/AudioItem";


class ListProfileAudios extends Component {
    constructor(props){
        super(props)

        this.state={
            user: null
        }

        this.userService = new UsersService()
    }


    componentDidMount(){
        this.getUser()
    }

    getUser = () => {
        this.userService.getOneUser(this.props.loggedUser._id)
        .then(res => {
            this.setState({
                ...this.state,
                user: res.data.user
            })
        })
        .catch(err => console.log(err)) 

    }


    displayMyAudios = () => {
        return (
            this.state.user ? 
            this.state.user.myAudios.map(audio =>  {
                return(
                    
                    <Col md={6}>
                        <ReactAudioPlayer src={`${audio.audioFile}`} autoPlay={false} controls/>
                        {this.loggedUser && 
                        <Link to={`/audios/${audio._id}`}>
                            <Button >Detalles</Button>
                        </Link>
                        }
                    </Col>
                )
        })
            : <p>cargando usuario</p>
        )
    }


    displayFavAudios = () => {
        return (
            this.state.user ? 
            this.state.user.favAudios.map(audio =>  {
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

    
    render(){
        
        return(
            <>
            <Row>
                <h3>Lista de mis audios</h3>
                <hr/>
                {this.state.user ?
                    this.displayMyAudios()
                    : <p>Cargando audios...</p>
                } 
            </Row>
            <Row>
                <h3>Lista de mis audios favoritos</h3>
                <hr/>
                {this.state.user ?
                    this.displayFavAudios()
                    : <p>Cargando audios...</p>
                } 
            </Row>
            </>
        )
    }
}

export default ListProfileAudios