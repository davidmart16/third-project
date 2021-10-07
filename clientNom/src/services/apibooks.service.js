
import axios from 'axios';

class APIBooksService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/apibook`,
      withCredentials: true
    })
  }

  getBooks = (text) => this.instance.get(`/search-book/${text}`)
  getBooksByType = (type, text) => this.instance.get(`/search-book-by/${type}/${text}`)
  getOneBook = (id) => this.instance.get(`/get-book/${id}`)

}

export default APIBooksService;