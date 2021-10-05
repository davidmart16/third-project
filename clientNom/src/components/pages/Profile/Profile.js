import { Container } from "react-bootstrap"
import ListProfileAudios from "../ListProfileAudios/ListProfileAudios"
import ListNotValidated from "../ListNotValidated/ListNotValidated"

const Profile = ({ loggedUser, storeUser }) => {


  return (
    <Container>
      <h1>¡Bienvenid@, {loggedUser.username}!</h1>
      {loggedUser.role === 'ADMIN' ?  
        <ListNotValidated loggedUser={loggedUser}></ListNotValidated>
        : <div><h3>Aqui van las listas de mis audios y los audios fav:</h3>
        <ListProfileAudios loggedUser={loggedUser} storeUser={storeUser}></ListProfileAudios>
        </div>
      }
    </Container>
  )
}

export default Profile