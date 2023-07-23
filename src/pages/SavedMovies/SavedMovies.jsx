import {useCallback, useContext, useEffect, useState} from 'react';
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
	const [isSwitched, setIsSwitched] = useState(false);

	const fetchSavedMovies = () => {
		setIsLoading(true);
		setError('');
		mainApi.getMovies()
			.then((data) => {
				setSavedMovies(data);
				setFilteredMovies([data]);
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
		const searchQuery = localStorage.getItem('search');
		const filtered = savedMovies.filter((movie) =>
			movie.nameRU?.toLowerCase().includes(searchQuery?.toLowerCase())
		);

		if (isSwitched) {
			setFilteredMovies(filtered.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION));
		} else {
			setFilteredMovies(filtered);
		}
	}, [savedMovies, isSwitched]);

	const handleFilter = useCallback(() => {
		const searchQuery = localStorage.getItem('search');
		const filtered = savedMovies.filter((movie) =>
			movie.nameRU?.toLowerCase().includes(searchQuery?.toLowerCase())
		);

		if (isSwitched) {
			setFilteredMovies(filtered.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION));
		} else {
			setFilteredMovies(filtered);
		}
	}, [isSwitched, savedMovies]);

	const handleSubmitMovies = () => {
		fetchSavedMovies();
		handleFilter();
	};

	return (
		<>
			<Header/>
			<main className="saved-movies">
				<SearchForm onSubmit={handleSubmitMovies} isSwitched={isSwitched} setIsSwitched={setIsSwitched}/>
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
							<MovieList movies={filteredMovies} />
						)}
					</>
				)}
			</main>
			<Footer/>
		</>
	);
};