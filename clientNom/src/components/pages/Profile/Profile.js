import { Container } from "react-bootstrap"
import ListNotValidated from "../ListNotValidated/ListNotValidated"

const Profile = ({ loggedUser }) => {

  if (loggedUser.role === 'ADMIN')

  return (
    <Container>
      <h1>¡Bienvenid@, {loggedUser.username}!</h1>
      {loggedUser.role === 'ADMIN' ?  
        <ListNotValidated></ListNotValidated>
        : <div>Aqui van las listas de mis audios y los audios fav</div>
      }
    </Container>
  )
}

export default Profile