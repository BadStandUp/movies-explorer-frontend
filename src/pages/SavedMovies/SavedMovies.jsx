import {useContext, useEffect, useState} from 'react';
import './SavedMovies.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList.jsx";
import Preloader from '../../components/Preloader/Preloader.jsx';
import * as mainApi from '../../utils/MainApi';
import {SavedMoviesContext} from '../../contexts/SavedMoviesContext.js';
import {SHORT_MOVIE_DURATION} from '../../utils/constants.js';

export default function SavedMovies() {
	const { savedMovies, setSavedMovies } = useContext(SavedMoviesContext);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [switched, setSwitched] = useState(false);
	const [searchQuery, setSearchQuery] = useState('')


	useEffect(() => {
		const filtered = savedMovies.filter((movie) =>
			movie.nameRU?.toLowerCase().includes(searchQuery?.toLowerCase())
		);

		if (switched) {
			setFilteredMovies(filtered.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION));
		} else {
			setFilteredMovies(filtered);
		}
	}, [savedMovies, switched, searchQuery]);

	const fetchSavedMovies = () => {
		setIsLoading(true);
		setError('');
		mainApi.getMovies()
			.then((data) => {
				setSavedMovies(data);
				setFilteredMovies(data);
			})
			.catch((err) => {
				console.error(err);
				setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	useEffect(() => {
		fetchSavedMovies()
	}, []);


	const handleSubmitMovies = (input) => {
		setSavedMovies(input);
	};

	return (
		<>
			<Header/>
			<main className="saved-movies">
				<SearchForm onSubmit={handleSubmitMovies} switched={switched} setSwitched={setSwitched}/>
				{isLoading ? (
					<>
						<Preloader fullScreen={false}/>
						<p className='saved-movies__loading'>Загрузка...</p>
					</>
				) : (
					<>
						{error && <p className='saved-movies__loading'>{error}</p>}
						{filteredMovies?.length === 0 ? (
							<p className='saved-movies__loading'>Ничего не найдено</p>
						) : (
							<MovieList savedMovies={filteredMovies} />
						)}
					</>
				)}
			</main>
			<Footer/>
		</>
	);
};