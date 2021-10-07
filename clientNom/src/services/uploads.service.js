import axios from 'axios';

class UploadsService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/upload`,
      withCredentials: true
    })
  }

  uploadAudio = (audioForm) => this.instance.post("/audio", audioForm)
}

export default UploadsService;