import { useState} from 'react';
import './Movies.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SearchForm from '../../components/SearchForm/SearchForm';
import MovieList from '../../components/MovieList/MovieList';
import Preloader from '../../components/Preloader/Preloader.jsx';
import * as moviesApi from '../../utils/MoviesApi';
import {SHORT_MOVIE_DURATION} from '../../utils/constants.js';

export default function Movies({
								   setMovies,
								   handleAddMovie,
								   handleDeleteMovie,
								   savedMovies,
								   savedResultMovies,
								   savedRequest,
								   setSavedRequest,
								   getSavedMovies
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const isSwitched = localStorage.getItem('switch');
	const [switched, setSwitched] = useState(false);
	const [buttonShown, setButtonShown] = useState(false);
	const [moviesShown, setMoviesShown] = useState();

	const fetchMovies = () => {
		setIsLoading(true);
		setError('');
		moviesApi.fetchMoviesData()
			.then((fetchedMovies) => {
				setMovies(fetchedMovies);
				localStorage.setItem('movies', JSON.stringify(fetchedMovies));
			})
			.then(() => {
				handleFilter();
			})
			.catch((err) => {
				console.error(err);
				setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
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
			filterDefault();
		} else {
			filterWithSwitch();
		}

		return {filter: filterDefault, filterWithSwitch: filterWithSwitch}
	}

	const foundMovies = JSON.parse(localStorage.getItem('filteredMovies'));

	function handleSubmitMovies(input) {
		localStorage.setItem('search', input);
		fetchMovies();
	}

	return (
		<>
			<Header/>
			<main className="movies">
				<SearchForm
					onSubmit={handleSubmitMovies}
					switched={switched}
					setSwitched={setSwitched}
					handleClick={handleFilter}
				/>
				{isLoading ? (
					<>
						<Preloader fullScreen={false} />
						<p className='movies__loading'>Загрузка...</p>
					</>
				) : (
					localStorage.getItem('filteredMovies') && (
						<MovieList
							foundMovies={foundMovies}
							handleAddMovie={handleAddMovie}
							handleDeleteMovie={handleDeleteMovie}
							error={error}
							savedMovies={savedMovies}
							savedResultMovies={savedResultMovies}
							savedRequest={savedRequest}
							setSavedRequest={setSavedRequest}
							getSavedMovies={getSavedMovies}
							buttonShown={buttonShown}
							setButtonShown={setButtonShown}
							moviesShown={moviesShown}
							setMoviesShown={setMoviesShown}
						/>
					)
				)}

			</main>
			<Footer/>
		</>
	);
}