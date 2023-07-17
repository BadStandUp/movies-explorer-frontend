import {useEffect, useMemo, useState} from 'react';
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
import Preloader from '../Preloader/Preloader.jsx';

import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {AuthContext} from '../../contexts/AuthContext.js';
import {SavedMoviesContext} from '../../contexts/SavedMoviesContext.js';
import * as authApi from '../../utils/AuthApi';

export default function App() {
    const [savedMovies, setSavedMovies] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const loggedInMemo = useMemo(() => ({loggedIn, setLoggedIn}), [loggedIn]);
    const currentUserMemo = useMemo(() => ({currentUser, setCurrentUser}), [currentUser]);
    const savedMoviesMemo = useMemo(() => ({ savedMovies, setSavedMovies }), [savedMovies]);

    // Проверка токена
    const checkToken = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoggedIn(false);
                return;
            }
            const response = await authApi.fetchUserData();
            if (!response.ok) {
                setLoggedIn(false);
                return;
            }
            const data = await response.json();
            const { user } = data;

            if (!user) {
                setLoggedIn(false);
                return;
            }

            setCurrentUser(user);
            setLoggedIn(true);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkToken().catch((err) => console.error(err));
        } else {
            setLoggedIn(false);
        }
    }, [navigate]);

    // Аутентификация
    const handleRegisterSubmit = async (name, email, password) => {
        setIsLoading(true);
        try {
            await authApi.signup(name, email, password);
            navigate('/signin', {replace: true});
        } catch (error) {
            console.error('Registration failed:', error);
        } finally {
            setIsLoading(false)
        }
    };

    const handleLoginSubmit = async (email, password) => {
        setIsLoading(true);
        try {
            await authApi.signin(email, password);
            setLoggedIn(true);
            setCurrentUser({});
            navigate('/movies', {replace: true});
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false)
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/', {replace: true});
        setLoggedIn(false);
        setCurrentUser({});
    };

    // Фильмы

  return (
    <div className="App">
        <div className='App__content'>
            <CurrentUserContext.Provider value={currentUserMemo}>
                <AuthContext.Provider value={loggedInMemo}>
                    <SavedMoviesContext.Provider value={savedMoviesMemo}>

                        {isLoading ? (<Preloader fullScreen={true}/>) : ''}
                        <Routes>
                            <Route element={<ProtectedRoute />}>
                                <Route path="/profile" element={<Profile handleLogout={handleLogout}/>}/>
                                <Route path="/movies" element={<Movies />}/>
                                <Route path="/saved-movies" element={<SavedMovies />}/>
                            </Route>
                            <Route path="/" element={<Main />}/>
                            <Route path="/signup" element={<Register handleRegisterSubmit={handleRegisterSubmit}/>}/>
                            <Route path="/signin" element={<Login handleLoginSubmit={handleLoginSubmit}/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>

                    </SavedMoviesContext.Provider>
                </AuthContext.Provider>
            </CurrentUserContext.Provider>
        </div>
    </div>
  );
}
