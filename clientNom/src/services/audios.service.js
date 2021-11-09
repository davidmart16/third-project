import axios from 'axios';

class AudiosService {
  constructor(){
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/audio`,
      withCredentials: true
    })
  }

  getAudios = () => this.instance.get("/");
  getAudiosNotValidated = () => this.instance.get("/validated");
  //Ejemplo de como hacerlo con query? no se porq tengo esto
  // getAudiosByFragment = (fragment) => this.instance.get(`/by-fragment?fragment=${fragment._id}`);
  getAudiosByFragment = (id) => this.instance.get(`/by-fragment/${id}`);
  getOneAudio = (id) => this.instance.get(`/${id}`);
  createAudio = (audioFile, fragment, userId) => this.instance.post("/", {audioFile, fragment, userId});
  deleteAudio = (id) => this.instance.delete(`/${id}`)
  updateAudio = (id) => this.instance.put(`/${id}`)
  updateAudioRate = (id, rate) => this.instance.put(`/rate/${id}`, {rate})

}

export default AudiosService;