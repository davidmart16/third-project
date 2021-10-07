import axios from 'axios';

class FragmentsService {
  constructor(){
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/fragment`
    })
  }

  getFragments = () => this.instance.get("/");
  getFragmentsNotValidated = () => this.instance.get("/validated");
  getOneFragment = (id) => this.instance.get(`/${id}`);
  createFragment = (fragment) => this.instance.post("/", fragment);
  deleteFragment = (id) => this.instance.delete(`/${id}`)
  updateFragment = (id) => this.instance.put(`/${id}`)

}

export default FragmentsService;