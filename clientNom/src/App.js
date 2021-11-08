import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './App.css'
import Navigator from './components/layout/Navigator/Navigator';
import Routes from './components/routes';
import AuthService from './services/auth.service';
import Footer from './components/layout/Footer/Footer';

const authService = new AuthService()

function App () {

  const [loggedUser, setLoggedUser] = useState(undefined)
  
  useEffect(() => {
    if (loggedUser !== undefined) return;
    authService.isloggedin()
      .then(res => storeUser(res.data))
      .catch(() => storeUser(null))

  }, [loggedUser])
  
  const storeUser = (user) => setLoggedUser(user)

  
    return (
      <div className="App">
        <Navigator loggedUser={loggedUser} storeUser={storeUser}/>
        <Routes loggedUser={loggedUser} storeUser={storeUser}/>
        <Footer></Footer>
      </div>
    );
  
}

export default App;
