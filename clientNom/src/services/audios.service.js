import axios from 'axios';

class AudiosService {
  constructor(){
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/audios`
    })
  }

  getAudios = () => this.instance.get("/");
  getOneAudio = (id) => this.instance.get(`/${id}`);
  createAudio = (audio) => this.instance.post("/", audio);
}

export default AudiosService;