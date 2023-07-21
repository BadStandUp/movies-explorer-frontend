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
import {GuestRoute} from '../GuestRoute/GuestRoute.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import Popup from '../UI/Popup/Popup.jsx';

import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {AuthContext} from '../../contexts/AuthContext.js';
import {SavedMoviesContext} from '../../contexts/SavedMoviesContext.js';
import * as authApi from '../../utils/AuthApi';

export default function App() {
    const [savedMovies, setSavedMovies] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const navigate = useNavigate();

    const loggedInMemo = useMemo(() => ({loggedIn, setLoggedIn}), [loggedIn]);
    const currentUserMemo = useMemo(() => ({currentUser, setCurrentUser}), [currentUser]);
    const savedMoviesMemo = useMemo(() => ({ savedMovies, setSavedMovies }), [savedMovies]);

    // Проверка токена
    const checkToken = async () => {
        setIsLoading(true);
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
        } finally {
            setLoggedIn(true);
            setIsLoading(false);
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
            setPopupMessage('Ошибка при регистрации.');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000);
        } finally {
            await handleLoginSubmit(email, password);
            setIsLoading(false);
            setPopupMessage('Вы успешно зарегистрировались.')
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000);
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
            setPopupMessage('Ошибка при логине.');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000);
        } finally {
            setIsLoading(false);
            setPopupMessage('Вы успешно залогинились.');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/', {replace: true});
        setLoggedIn(false);
        setCurrentUser({});
        setSavedMovies([]);
        setPopupMessage('Вы успешно вышли.')
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 5000);
    };


  return (
    <div className="App">
        <div className='App__content'>
            <CurrentUserContext.Provider value={currentUserMemo}>
                <AuthContext.Provider value={loggedInMemo}>
                    <SavedMoviesContext.Provider value={savedMoviesMemo}>
                        {isLoading ? (<Preloader fullScreen={true}/>) : ''}
                        <Routes>
                            <Route path="/profile" element={<ProtectedRoute><Profile handleLogout={handleLogout}/></ProtectedRoute>}/>
                            <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>}/>
                            <Route path="/saved-movies" element={<ProtectedRoute><SavedMovies /></ProtectedRoute>}/>
                            <Route path="/" element={<Main />}/>
                            <Route path="/signup" element={
                                <GuestRoute>
                                    <Register handleRegisterSubmit={handleRegisterSubmit}/>
                                </GuestRoute>
                                }/>
                            <Route path="/signin" element={
                                <GuestRoute>
                                    <Login handleLoginSubmit={handleLoginSubmit}/>
                                </GuestRoute>
                                }/>
                            <Route path="*" element={<NotFound />}/>
                        </Routes>
                        {showPopup && (
                            <Popup message={popupMessage} />
                        )}
                    </SavedMoviesContext.Provider>
                </AuthContext.Provider>
            </CurrentUserContext.Provider>
        </div>
    </div>
  );
}
