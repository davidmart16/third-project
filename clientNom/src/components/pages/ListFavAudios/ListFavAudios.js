import { Component } from "react";
import { Row } from "react-bootstrap"
import UsersService from "../../../services/users.service";
import AudioItem from "../AudiosPage/AudioItem/AudioItem";




class ListFavAudios extends Component {
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
                    <AudioItem {...audio} loggedUser={this.props.loggedUser}/>
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
                    <AudioItem {...audio} loggedUser={this.props.loggedUser}/>
                )
        })
            : <p>cargando usuario</p>
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

export default ListFavAudios