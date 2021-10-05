import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import SearchBar from '../layout/SearchBar/SearchBar';
import AudioDetails from '../pages/AudiosPage/AudioDetails/AudioDetails';
import AudioForm from '../pages/AudiosPage/AudioForm/AudioForm';
import AudioList from '../pages/AudiosPage/AudiosList/AudiosList';
import BookAPIDetails from '../pages/BooksAPIPage/BookAPIDetails/BookAPIDetails';
import BooksAPIPage from '../pages/BooksAPIPage/BooksAPIPage';
import BookDetails from '../pages/BooksPage/BookDetails/BookDetails';
import BooksList from '../pages/BooksPage/BooksList/BooksList';
import CommentForm from '../pages/CommentsPage/CommentForm/CommentForm';
import FragmentDetails from '../pages/FragmentsPage/FragmentDetails/FragmentDetails';
import FragmentForm from '../pages/FragmentsPage/FragmentForm/FragmentForm';
// import FragmentsList from '../pages/FragmentsPage/FragmentsList/FragmentsList';
import HomePage from '../pages/HomePage/HomePage';
import Login from '../pages/Login/Login';
import Profile from '../pages/Profile/Profile';
import PruebaBooks from '../pages/PruebaBooks/PruebaBooks';
// import PruebaAudio from '../pages/PruebaAudio/PruebaAudio';
import Signup from '../pages/Signup/Signup';

const Routes = ({ storeUser, loggedUser }) => {


  return (
      <Switch>
        <Route exact path="/" render={() => <HomePage loggedUser={loggedUser} storeUser={storeUser} />} />
        <Route exact path="/libros" render={() => <BooksList loggedUser={loggedUser} />} />
        <Route exact path="/audios" render={() => <AudioList loggedUser={loggedUser} storeUser={storeUser}/>} />
        <Route exact path="/registro" render={(props) => <Signup {...props} />} />
        <Route exact path="/iniciar-sesion" render={(props) => <Login storeUser={storeUser} {...props} />} />
        <Route path="/lista-libros/:text" render={(props) => <BooksAPIPage {...props} loggedUser={loggedUser} />} />
        <Route path="/detalles/:id" render={(props) =>  <BookAPIDetails {...props} /> } />
        {/* <Route exact path="/fragmentos" render={() => <FragmentsList loggedUser={loggedUser} />} /> */}
        {/* <Route path="/prueba" render={() => <PruebaAudio />} /> */}
        <Route path="/prueba-searchbar" render={() => <SearchBar />} />
        <Route path="/prueba" render={() => <PruebaBooks />} />
        
        {loggedUser ? (
          <>
            <Route path="/libros/:id" render={(props) =>  <BookDetails {...props} /> } />
            <Route path="/fragmentos/:id" render={(props) => <FragmentDetails {...props} /> } />
            <Route path="/audios/:id" render={(props) => <AudioDetails {...props} /> } />
            <Route path="/crear-audio/:fragmentId" render={(props) => <AudioForm {...props} loggedUser={loggedUser}/>}  />
            <Route path="/crear-comentario/:audioId" render={(props) => <CommentForm {...props} loggedUser={loggedUser}/> } />
            <Route path="/crear-fragmento/:bookId" render={(props) => <FragmentForm {...props}/> } />
            <Route path="/perfil" render={() => <Profile loggedUser={loggedUser} storeUser={storeUser}/> } />
          </>
        )
        : <Redirect to="/iniciar-sesion" /> 
        }
      </Switch>
    )
}

export default Routes