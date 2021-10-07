import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import './App.css'
import Footer from './components/layout/Footer/Footer';
import Navigator from './components/layout/Navigator/Navigator';
import Routes from './components/routes';
import AuthService from './services/auth.service';

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedUser: undefined
    }
    this.authService = new AuthService()
  }

  componentDidMount = () => {
    this.authService.isloggedin()
      .then(res => this.storeUser(res.data))
      .catch(err => this.storeUser(null))
  }

  storeUser = (user) => this.setState({ loggedUser: user })

  render = () => {
    return (
      <div className="App">
        <Navigator loggedUser={this.state.loggedUser} storeUser={this.storeUser}/>
        <Routes loggedUser={this.state.loggedUser} storeUser={this.storeUser}/>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
