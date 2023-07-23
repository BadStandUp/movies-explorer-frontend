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
import * as mainApi from '../../utils/MainApi.js';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [savedResultMovies, setSavedResultMovies] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupError, setPopupError] = useState(false);

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
            await handleLoginSubmit(email, password);
            setPopupMessage('Вы успешно зарегистрировались.');
            setPopupError(false);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000);
            navigate('/signin', { replace: true });
        } catch (error) {
            if (error.toString().includes('400')) {
                setPopupMessage('Переданы некорректные данные');
            } else if (error.toString().includes('409')) {
                setPopupMessage('Пользователь с таким E-mail уже зарегистрирован.');
            } else {
                setPopupMessage('Ошибка при регистрации.');
            }
            setPopupError(true);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginSubmit = async (email, password) => {
        setIsLoading(true);
        try {
            await authApi.signin(email, password);
            setLoggedIn(true);
            setCurrentUser({});
            navigate('/movies', { replace: true });
            setPopupMessage('Вы успешно залогинились.');
            setPopupError(false);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000);
        } catch (error) {
            let errorMessage = 'Ошибка при логине.';
            if (error.toString().includes('400')) {
                errorMessage = 'Переданы некорректные данные.';
            } else if (error.toString().includes('401')) {
                errorMessage = 'Неправильные почта или пароль.';
            }
            setPopupError(true);
            setPopupMessage(errorMessage);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/', {replace: true});
        setLoggedIn(false);
        setCurrentUser({});
        setSavedMovies([]);
        setPopupMessage('Вы успешно вышли.');
        setPopupError(false);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 5000);
    };

    // Фильмы

    function handleAddMovie(movie) {
        mainApi.addMovie(movie)
            .then((newMovie) => {
                setSavedMovies([...savedMovies, newMovie]);
                return savedMovies;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleDeleteMovie(id) {
        mainApi.deleteMovie(id)
            .then(() => {
                setSavedMovies(
                    savedMovies.filter((item) => {
                        return item._id !== id;
                    }),
                );
                return savedMovies;
            })
            .catch((err) => {
                console.log(err);
            });
    }

  return (
    <div className="App">
        <div className='App__content'>
            <CurrentUserContext.Provider value={currentUserMemo}>
                <AuthContext.Provider value={loggedInMemo}>
                    <SavedMoviesContext.Provider value={savedMoviesMemo}>
                        {isLoading ? (<Preloader fullScreen={true}/>) : ''}
                        <Routes>
                            <Route exact path="/profile" element={<ProtectedRoute><Profile handleLogout={handleLogout}/></ProtectedRoute>}/>
                            <Route exact path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>}/>
                            <Route exact path="/saved-movies" element={<ProtectedRoute><SavedMovies /></ProtectedRoute>}/>
                            <Route path="/" element={<Main />}/>
                            <Route path="/signup" element={<GuestRoute><Register handleRegisterSubmit={handleRegisterSubmit}/></GuestRoute>}/>
                            <Route path="/signin" element={<GuestRoute><Login handleLoginSubmit={handleLoginSubmit}/></GuestRoute>}/>
                            <Route path="*" element={<NotFound />}/>
                        </Routes>
                        {showPopup && (
                            <Popup message={popupMessage} error={popupError} />
                        )}
                    </SavedMoviesContext.Provider>
                </AuthContext.Provider>
            </CurrentUserContext.Provider>
        </div>
    </div>
  );
}
