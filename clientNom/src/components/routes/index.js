import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import AudioForm from '../pages/AudiosPage/AudioForm/AudioForm';
import AudioList from '../pages/AudiosPage/AudiosList/AudiosList';
import BookDetails from '../pages/BooksPage/BookDetails/BookDetails';
import BooksList from '../pages/BooksPage/BooksList/BooksList';
import HomePage from '../pages/HomePage/HomePage';
import Login from '../pages/Login/Login';
import Profile from '../pages/Profile/Profile';
import Signup from '../pages/Signup/Signup';

const Routes = ({ storeUser, loggedUser }) => {


  return (
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route exact path="/libros" render={() => <BooksList />} />
        <Route exact path="/audios" render={() => <AudioList />} />
        <Route exact path="/registro" render={(props) => <Signup {...props} />} />
        <Route exact path="/iniciar-sesion" render={(props) => <Login storeUser={storeUser} {...props} />} />
        <Route path="/libros/:id" render={(props) => <BookDetails {...props} />} />
        <Route path="/crear-audio" render={(props) => <AudioForm {...props}/>} />
        <Route path="/perfil" render={() => loggedUser ? <Profile loggedUser={loggedUser} /> : <Redirect to="/iniciar-sesion" />} />
      </Switch>
    )
}

export default Routes