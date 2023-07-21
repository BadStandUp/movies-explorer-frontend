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
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [isSwitched, setIsSwitched] = useState(false);

	useEffect(() => {
		fetchSavedMovies();
	}, []);

	useEffect(() => {
		const searchQuery = localStorage.getItem('search');
		if (!isSwitched) {
			const filtered = savedMovies.filter((movie) =>
				movie.nameRU?.toLowerCase().includes(searchQuery?.toLowerCase())
			);
			setFilteredMovies(filtered);
		} else {
			const filteredWithSwitch = savedMovies.filter(
				(movie) =>
					movie.nameRU?.toLowerCase().includes(searchQuery?.toLowerCase()) &&
					movie.duration <= SHORT_MOVIE_DURATION
			);
			setFilteredMovies(filteredWithSwitch);
		}
	}, [savedMovies, isSwitched]);

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

	const handleFilter = useCallback(
		() => {
			const searchQuery = localStorage.getItem('search');
			if (isSwitched) {
				const filtered = savedMovies.filter((movie) =>
					movie.nameRU?.toLowerCase().includes(searchQuery?.toLowerCase())
				);
				setFilteredMovies(filtered);
			} else {
				const filteredWithSwitch = savedMovies.filter(
					(movie) =>
						movie.nameRU?.toLowerCase().includes(searchQuery?.toLowerCase()) &&
						movie.duration <= SHORT_MOVIE_DURATION
				);
				setFilteredMovies(filteredWithSwitch);
			}
		},
		[isSwitched, savedMovies]
	);

	const handleSubmitMovies = () => {
		fetchSavedMovies();
		handleFilter();
	};

	const handleSwitchChange = (checked) => {
		setIsSwitched(checked);
	};

	return (
		<>
			<Header/>
			<main className="saved-movies">
				<SearchForm onSubmit={handleSubmitMovies} onSwitchChange={handleSwitchChange}/>
				{isLoading ? (
					<>
						<Preloader fullScreen={false}/>
						<p className='saved-movies__loading'>Загрузка...</p>
					</>
				) : (
					<>
						{error && <p className='saved-movies__loading'>{error}</p>}
						{filteredMovies.length === 0 ? (
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