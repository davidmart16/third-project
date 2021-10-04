import axios from 'axios';

class UsersService {
  constructor(){
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/user`
    })
  }

  getUsers = () => this.instance.get("/");
  getOneUser = (id) => this.instance.get(`/${id}`);
  createUser = (user) => this.instance.post("/", user);
  deleteUser = (id) => this.instance.delete(`/${id}`)
  
  // showMyAudios = (id) => this.instance.get(`/my-audios/${id}`)
  // showAudiosFav = (id) => this.instance.get(`/my-fav-audios/${id}`)
  addAudiosFav = (audioId, id) => this.instance.put(`/add-fav-audios/${id}`, audioId)
}

export default UsersService;