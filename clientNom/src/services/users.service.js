import axios from 'axios';

class UsersService {
  constructor(){
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/users`
    })
  }

  getUsers = () => this.instance.get("/");
  getOneUser = (id) => this.instance.get(`/${id}`);
  createUser = (user) => this.instance.post("/", user);
  deleteUser = (id) => this.instance.delete(`/${id}`)
  
  addAudiosFav = (audioId) => this.instance.put('/fav-audios', audioId)
  showAudiosFav = (id) => this.instance.put(`/${id}/my-fav-audios`)
}

export default UsersService;