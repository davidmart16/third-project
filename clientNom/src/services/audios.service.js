import axios from 'axios';

class AudiosService {
  constructor(){
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/audios`
    })
  }

  getAudios = () => this.instance.get("/");
  getAudiosNotValidated = () => this.instance.get("/validated");
  getAudiosByFragment = (fragment) => this.instance.get("/by-fragment", fragment);
  getOneAudio = (id) => this.instance.get(`/${id}`);
  createAudio = (audio) => this.instance.post("/", audio);
  deleteAudio = (id) => this.instance.delete(`/${id}`)

}

export default AudiosService;