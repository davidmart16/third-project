import axios from 'axios';

class BooksService {
  constructor(){
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/book`,
      withCredentials: true
    })
  }

  getBooks = () => this.instance.get("/");
  getOneBook = (id) => this.instance.get(`/${id}`);
  createBook = (book) => this.instance.post('/create', book);
}

export default BooksService;