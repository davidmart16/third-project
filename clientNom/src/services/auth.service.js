import axios from 'axios';

class AuthService {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/auth`,
      withCredentials: true
    })
  }

  signup = (username, password, email) => this.instance.post("/signup", { username, password, email})
  login = (username, password, email) => this.instance.post("/login", { username, password, email })
  logout = () => this.instance.get("/logout")
  isloggedin = () => this.instance.post("/isloggedin")
}

export default AuthService;