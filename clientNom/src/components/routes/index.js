import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import AudioForm from '../pages/AudiosPage/AudioForm/AudioForm';
import AudioList from '../pages/AudiosPage/AudiosList/AudiosList';
import BookDetails from '../pages/BooksPage/BookDetails/BookDetails';
import BooksList from '../pages/BooksPage/BooksList/BooksList';
import FragmentDetails from '../pages/FragmentsPage/FragmentDetails/FragmentDetails';
import FragmentForm from '../pages/FragmentsPage/FragmentForm/FragmentForm';
import FragmentsList from '../pages/FragmentsPage/FragmentsList/FragmentsList';
import HomePage from '../pages/HomePage/HomePage';
import Login from '../pages/Login/Login';
import Profile from '../pages/Profile/Profile';
import PruebaBooks from '../pages/PruebaBooks/PruebaBooks';
// import PruebaAudio from '../pages/PruebaAudio/PruebaAudio';
import Signup from '../pages/Signup/Signup';

const Routes = ({ storeUser, loggedUser }) => {


  return (
      <Switch>
        {/* <Route path="/prueba" render={() => <PruebaAudio />} /> */}
        <Route path="/prueba" render={() => <PruebaBooks />} />
        <Route exact path="/" render={() => <HomePage loggedUser={loggedUser} storeUser={storeUser} />} />
        <Route exact path="/libros" render={() => <BooksList />} />
        <Route exact path="/audios" render={() => <AudioList />} />
        <Route exact path="/fragmentos" render={() => <FragmentsList />} />
        <Route exact path="/fragmentos/:id" render={(props) => <FragmentDetails {...props} />} />
        <Route exact path="/registro" render={(props) => <Signup {...props} />} />
        <Route exact path="/iniciar-sesion" render={(props) => <Login storeUser={storeUser} {...props} />} />
        <Route path="/libros/:id" render={(props) => <BookDetails {...props} />} />
        <Route path="/crear-audio/:fragmentId" render={(props) => <AudioForm {...props}/>} />
        <Route path="/crear-fragmento/:bookId" render={(props) => <FragmentForm {...props}/>} />
        <Route path="/perfil" render={() => loggedUser ? <Profile loggedUser={loggedUser} /> : <Redirect to="/iniciar-sesion" />} />
      </Switch>
    )
}

export default Routes