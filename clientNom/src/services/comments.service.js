import axios from 'axios';

class CommentsService {
  constructor(){
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/comment`
    })
  }

  getComments = () => this.instance.get("/");
  getCommentsNotValidated = () => this.instance.get("/validated");
  getCommentsByUser = (user) => this.instance.get("/by-user", user);
  createComment = (comment) => this.instance.post("/", comment);
  deleteComment = (id) => this.instance.delete(`/${id}`)

}

export default CommentsService;