import { useState} from 'react';
import './Movies.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SearchForm from '../../components/SearchForm/SearchForm';
import MovieList from '../../components/MovieList/MovieList';
import Preloader from '../../components/Preloader/Preloader.jsx';
import * as moviesApi from '../../utils/MoviesApi';
import {SHORT_MOVIE_DURATION} from '../../utils/constants.js';

export default function Movies() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [isSwitched, setIsSwitched] = useState(false);

	const fetchMovies = () => {
		setIsLoading(true);
		setError('');
		moviesApi.fetchMoviesData()
			.then((fetchedMovies) => {
				localStorage.setItem('movies', JSON.stringify(fetchedMovies));
			})
			.then(() => {
				handleFilter();
			})
			.catch((err) => {
				console.error(err);
				setError(
					'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
				);
			})
			.finally(() => setIsLoading(false));
	};

	function handleFilter() {
		const movies = JSON.parse(localStorage.getItem('movies'));
		const searchQuery = localStorage.getItem('search');
		function filterDefault() {
			const filtered = movies.filter((movie) =>
				movie.nameRU?.toLowerCase().includes(searchQuery?.toLowerCase())
			);
			localStorage.setItem('filteredMovies', JSON.stringify(filtered));
		}
		function filterWithSwitch() {
			const filteredWithSwitch = movies.filter(
				(movie) =>
					movie.nameRU?.toLowerCase().includes(searchQuery?.toLowerCase()) &&
					movie.duration <= SHORT_MOVIE_DURATION
			);
			localStorage.setItem('filteredMovies', JSON.stringify(filteredWithSwitch));
		}

		if (!isSwitched) {
			return filterDefault();
		} else {
			return filterWithSwitch();
		}
	}

	const foundMovies = JSON.parse(localStorage.getItem('filteredMovies'));

	const handleSubmitMovies = () => {
		fetchMovies();
	};

	return (
		<>
			<Header/>
			<main className="movies">
				<SearchForm onSubmit={handleSubmitMovies} isSwitched={isSwitched} setIsSwitched={setIsSwitched} />
				{isLoading ? (
					<>
						<Preloader fullScreen={false} />
						<p className='movies__loading'>Загрузка...</p>
					</>
				) : (
					<>
						{error && <p className='movies__loading'>{error}</p>}
						{foundMovies?.length === 0 ? (
							<p className='movies__loading'>Ничего не найдено</p>
						) : (
							<MovieList movies={foundMovies}/>
						)}
					</>
				)}
			</main>
			<Footer/>
		</>
	);
}