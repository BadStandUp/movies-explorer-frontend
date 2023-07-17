import {useCallback, useState} from 'react';
import './Movies.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SearchForm from '../../components/SearchForm/SearchForm';
import MovieList from '../../components/MovieList/MovieList';
import Preloader from '../../components/Preloader/Preloader.jsx';
import * as moviesApi from '../../utils/MoviesApi';

export default function Movies() {
	const [movies, setMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [isSwitched, setIsSwitched] = useState(false);

	const fetchMovies = () => {
		setIsLoading(true);
		setError('');
		moviesApi.fetchMoviesData()
			.then((fetchedMovies) => {
				setMovies(fetchedMovies);
				localStorage.setItem('movies', JSON.stringify(fetchedMovies));
			})
			.catch((err) => {
				console.error(err);
				setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
			})
			.finally(() => setIsLoading(false))
	}

	const handleFilter = useCallback(
		() => {
			const searchQuery = localStorage.getItem('search');
			if (!isSwitched) {
				const filtered = movies.filter((movie) =>
					movie.nameRU?.toLowerCase().includes(searchQuery?.toLowerCase())
				);
				localStorage.setItem('filteredMovies', JSON.stringify(filtered));
				setFilteredMovies(filtered);
			} else {
				const filteredWithSwitch = movies.filter(
					(movie) =>
						movie.nameRU?.toLowerCase().includes(searchQuery?.toLowerCase()) &&
						movie.duration <= 60
				);
				localStorage.setItem('filteredMovies', JSON.stringify(filteredWithSwitch));
				setFilteredMovies(filteredWithSwitch);
			}
		},
		[isSwitched, movies]
	);
	const foundMovies = JSON.parse(localStorage.getItem('filteredMovies'));

	const handleSubmitMovies = () => {
		fetchMovies();
		handleFilter();
	};

	const handleSwitchChange = (checked) => {
		setIsSwitched(checked);
	};

	return (
		<>
			<Header/>
			<main className="movies">
				<SearchForm onSubmit={handleSubmitMovies} onSwitchChange={handleSwitchChange}/>
				{isLoading ? (
					<>
						<Preloader fullScreen={false}/>
						<p className='movies__loading'>Загрузка...</p>
					</>
				) : (
					<>
						{error && <p className='movies__loading'>{error}</p>}
						{filteredMovies.length === 0 ? (
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