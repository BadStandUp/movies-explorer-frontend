import {Route, Routes} from "react-router-dom";
import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../../pages/Main/Main";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import Profile from "../../pages/Profile/Profile";
import Movies from "../../pages/Movies/Movies";
import SavedMovies from "../../pages/SavedMovies/SavedMovies";
import NotFound from "../../pages/NotFound/NotFound";

export default function App() {
  return (
    <div className="App">
        <div className='App__content'>
            <Header />
            <Routes>
                <Route path='/' element={<Main />}/>
                <Route path='/signup' element={<Register />}/>
                <Route path='/signin' element={<Login />}/>
                <Route path='/profile' element={<Profile />}/>
                <Route path='/movies' element={<Movies />}/>
                <Route path='/saved-movies' element={<SavedMovies />}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
            <Footer/>
        </div>
    </div>
  );
}
