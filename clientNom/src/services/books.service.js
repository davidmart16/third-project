import axios from 'axios';

class BooksService {
  constructor(){
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/book`
    })
  }

  getBooks = () => this.instance.get("/");
  getOneBook = (id) => this.instance.get(`/${id}`);
}

export default BooksService;