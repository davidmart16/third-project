import { Container } from "react-bootstrap"
import ListFavAudios from "../ListFavAudios/ListFavAudios"
import ListNotValidated from "../ListNotValidated/ListNotValidated"

const Profile = ({ loggedUser }) => {


  return (
    <Container>
      <h1>¡Bienvenid@, {loggedUser.username}!</h1>
      {loggedUser.role === 'ADMIN' ?  
        <ListNotValidated loggedUser={loggedUser}></ListNotValidated>
        : <div><h3>Aqui van las listas de mis audios y los audios fav:</h3>
        <ListFavAudios loggedUser={loggedUser}></ListFavAudios>
        </div>
      }
    </Container>
  )
}

export default Profile