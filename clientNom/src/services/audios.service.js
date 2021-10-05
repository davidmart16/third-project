import axios from 'axios';

class AudiosService {
  constructor(){
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/audio`,
      withCredentials: true
    })
  }

  getAudios = () => this.instance.get("/");
  getAudiosNotValidated = () => this.instance.get("/validated");
  getAudiosByFragment = (fragment) => this.instance.get(`/by-fragment?fragment=${fragment._id}`);
  getOneAudio = (id) => this.instance.get(`/${id}`);
  createAudio = (audioFile, fragment, userId) => this.instance.post("/", {audioFile, fragment, userId});
  deleteAudio = (id) => this.instance.delete(`/${id}`)
  updateAudio = (id) => this.instance.put(`/${id}`)
  updateAudioRate = (id, rate) => this.instance.put(`/rate/${id}`, rate)

}

export default AudiosService;