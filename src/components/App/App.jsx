import {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import './App.css';
import Main from "../../pages/Main/Main";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import Profile from "../../pages/Profile/Profile";
import Movies from "../../pages/Movies/Movies";
import SavedMovies from "../../pages/SavedMovies/SavedMovies";
import NotFound from "../../pages/NotFound/NotFound";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';

import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import * as authApi from '../../utils/AuthApi';
import * as moviesApi from '../../utils/MoviesApi'

export default function App() {
    const [movies, setMovies] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            authApi.getUser(token)
                .then((res) => {
                    if (res) {
                        setCurrentUser(res);
                        setLoggedIn(true);
                    }
                })
                .catch(err => console.log(err))
        }
    }, []);

    useEffect(() => {
        if (loggedIn) {
            authApi.getUser(localStorage.getItem('jwt'))
                .then((info) => {
                    setCurrentUser(info);
                })
                .catch(err => console.log(err))
        }
    }, []);

    function handleRegisterSubmit(name, email, password) {
        authApi.signup(name, email, password)
            .then(() => {
                navigate('/signin', {replace: true});
            })
            .catch(err => console.log(err))
    }

    function handleLoginSubmit(email, password) {
        authApi.signin(email, password)
            .then((data) => {
                localStorage.setItem('jwt', data.token);
                setLoggedIn(true);
                navigate('/', {replace: true});
            })
            .catch(err => console.log(err))
    }

  return (
    <div className="App">
        <div className='App__content'>
            <CurrentUserContext.Provider value={currentUser}>
                <Routes>
                    <Route element={<ProtectedRoute loggedIn={loggedIn}/>}>
                        <Route path='/profile' element={<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
                        <Route path='/movies' element={<Movies loggedIn={loggedIn} movies={movies}/>}/>
                        <Route path='/saved-movies' element={<SavedMovies loggedIn={loggedIn}/>}/>
                    </Route>
                    <Route path='/' element={<Main loggedIn={loggedIn}/>}/>
                    <Route path='/signup' element={<Register handleRegisterSubmit={handleRegisterSubmit}/>}/>
                    <Route path='/signin' element={<Login handleLoginSubmit={handleLoginSubmit} />}/>
                    <Route path='*' element={<NotFound />}/>
                </Routes>
            </CurrentUserContext.Provider>
        </div>
    </div>
  );
}
